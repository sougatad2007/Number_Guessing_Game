from flask import Flask, render_template, request, jsonify
import random

# NEW: Tell Flask to use the "interface" folder for HTML, CSS, and JS
game = Flask(__name__, template_folder="interface", static_folder="interface")

target_number = random.randint(1, 100)

@game.route("/")
def home():
    return render_template("game.html")

@game.route("/guess", methods=["POST"])
def guess():
    global target_number
    data = request.get_json()
    user_guess = int(data["guess"])
    diff = abs(target_number - user_guess)

    if user_guess == target_number:
        message = f"🎉 Correct! The number was {target_number}. Starting a new game!"
        target_number = random.randint(1, 100)
    elif diff <= 5:
        message = "🔥 Very close! Think " + ("higher ↑" if user_guess < target_number else "lower ↓")
    elif diff <= 15:
        message = "🙂 Close! Try " + ("higher ↑" if user_guess < target_number else "lower ↓")
    else:
        message = "⬆️ Too low!" if user_guess < target_number else "⬇️ Too high!"

    return jsonify({"message": message})

if __name__ == "__main__":
    game.run(debug=True)