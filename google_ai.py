#!/usr/bin/env python3
import argparse
import re
import sys
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError

AI_MODE_URL = "https://www.google.com/ai"


def clean_text(text: str) -> str:
    text = text.replace("\r", "")
    lines = []
    for line in text.split("\n"):
        line = re.sub(r"[ \t]+", " ", line).strip()
        if line:
            lines.append(line)

    # Remove common UI noise, while keeping the answer text.
    noise = {
        "Sign in", "Google", "Search", "Images", "Videos", "News",
        "Shopping", "More", "AI Mode", "All", "Tools",
    }
    out = []
    for line in lines:
        if line in noise:
            continue
        if line not in out:
            out.append(line)
    return "\n".join(out)


def find_prompt(page):
    # Google UI can change. Try several generic input patterns.
    candidates = [
        page.locator("textarea"),
        page.locator('input[type="text"]'),
        page.locator('[contenteditable="true"]'),
        page.locator('[role="textbox"]'),
    ]

    for loc in candidates:
        try:
            count = loc.count()
            for i in range(min(count, 10)):
                el = loc.nth(i)
                if el.is_visible():
                    return el
        except Exception:
            pass

    return None


def snapshot(page):
    """Prefer the main content area; fall back to body."""
    for selector in ["main", '[role="main"]']:
        try:
            loc = page.locator(selector).first
            if loc.is_visible():
                txt = loc.inner_text(timeout=3000)
                if len(txt.strip()) > 80:
                    return clean_text(txt)
        except Exception:
            pass

    try:
        return clean_text(page.locator("body").inner_text(timeout=5000))
    except Exception:
        return ""


def wait_for_answer(page, before: str, timeout_s: int = 45) -> str:
    start = time.time()
    last = before
    stable_since = time.time()

    while time.time() - start < timeout_s:
        time.sleep(1.0)
        current = snapshot(page)

        if len(current) > len(last) + 80:
            last = current
            stable_since = time.time()
        elif current and current != last:
            last = current
            stable_since = time.time()

        # Streaming answers normally stop changing for a few seconds.
        if len(last) > 250 and time.time() - stable_since >= 3:
            return last

    return last


def main():
    parser = argparse.ArgumentParser(
        description="Query Google AI Mode from the terminal using Playwright."
    )
    parser.add_argument("query", nargs="*", help="Question to ask Google AI Mode")
    parser.add_argument("--profile", default=None,
                        help="Persistent Chrome profile directory (optional)")
    parser.add_argument("--headed", action="store_true",
                        help="Show the browser instead of running headless")
    parser.add_argument("--debug", action="store_true",
                        help="Print diagnostic information")
    args = parser.parse_args()

    query = " ".join(args.query).strip()
    if not query:
        query = input("Google AI > ").strip()

    if not query:
        sys.exit("No query supplied.")

    profile = Path(args.profile).expanduser() if args.profile else None

    with sync_playwright() as p:
        browser = None
        context = None

        try:
            if profile:
                profile.mkdir(parents=True, exist_ok=True)
                context = p.chromium.launch_persistent_context(
                    user_data_dir=str(profile),
                    headless=not args.headed,
                    channel="chrome",
                    viewport={"width": 1440, "height": 1000},
                    args=["--disable-blink-features=AutomationControlled"],
                )
            else:
                browser = p.chromium.launch(
                    headless=not args.headed,
                    channel="chrome",
                    args=["--disable-blink-features=AutomationControlled"],
                )
                context = browser.new_context(viewport={"width": 1440, "height": 1000})

            page = context.pages[0] if context.pages else context.new_page()

            page.goto(AI_MODE_URL, wait_until="domcontentloaded", timeout=30000)

            # Give the JS application time to initialize.
            page.wait_for_timeout(2500)

            prompt = find_prompt(page)
            if prompt is None:
                # Some versions expose the query box only after clicking the page.
                page.mouse.click(700, 900)
                page.wait_for_timeout(1000)
                prompt = find_prompt(page)

            if prompt is None:
                if args.debug:
                    print("URL:", page.url, file=sys.stderr)
                    print(snapshot(page)[:5000], file=sys.stderr)
                sys.exit(
                    "Could not find the AI Mode input. Google changed the page UI."
                )

            before = snapshot(page)

            try:
                prompt.fill(query)
            except Exception:
                page.keyboard.insert_text(query)

            # Enter submits the AI Mode prompt in current Google Search UI.
            prompt.press("Enter")
            page.wait_for_timeout(1000)

            answer = wait_for_answer(page, before)

            if args.debug:
                print("Final URL:", page.url, file=sys.stderr)

            # Try to extract only the newly-added content.
            if before and answer.startswith(before):
                answer = answer[len(before):].strip()

            if len(answer) < 100:
                print(answer or "No answer text extracted.")
            else:
                print("\n" + answer)

        except PlaywrightTimeoutError as e:
            sys.exit(f"Google page timed out: {e}")
        finally:
            try:
                if context:
                    context.close()
            except Exception:
                pass
            try:
                if browser:
                    browser.close()
            except Exception:
                pass


if __name__ == "__main__":
    main()
