import os

from flask import Flask, request, jsonify, redirect, render_template
import sqlite3
import string
import random
from urllib.parse import urlparse

app = Flask(__name__)

DATABASE = "urls.db"


def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            short_code TEXT UNIQUE NOT NULL,
            original_url TEXT NOT NULL,
            clicks INTEGER DEFAULT 0
        )
    """)

    conn.commit()
    conn.close()


def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits

    while True:
        code = ''.join(random.choices(characters, k=length))

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id FROM urls WHERE short_code = ?",
            (code,)
        )
        existing = cursor.fetchone()
        conn.close()

        if not existing:
            return code


def is_valid_url(url):
    parsed = urlparse(url)

    return (
        parsed.scheme in ("http", "https")
        and parsed.netloc
        and "." in parsed.netloc
    )

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/shorten", methods=["POST"])
def shorten_url():

    data = request.get_json()

    if not data or "url" not in data:
        return jsonify({"error": "URL is required"}), 400

    original_url = data["url"].strip()

    if not is_valid_url(original_url):
        return jsonify({"error": "Invalid URL"}), 400

    short_code = generate_short_code()

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO urls (short_code, original_url) VALUES (?, ?)",
        (short_code, original_url)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "original_url": original_url,
        "short_code": short_code,
        "short_url": f"/{short_code}"
    }), 201


@app.route("/<short_code>")
def redirect_url(short_code):

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT original_url FROM urls WHERE short_code = ?",
        (short_code,)
    )

    result = cursor.fetchone()

    if not result:
        conn.close()
        return jsonify({"error": "Short URL not found"}), 404

    original_url = result[0]

    cursor.execute(
        "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?",
        (short_code,)
    )

    conn.commit()
    conn.close()

    return redirect(original_url)

init_db()
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=os.environ.get("FLASK_DEBUG") == "1",
    )
