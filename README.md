# Opportunity Brain

A free scorecard for weighing a business idea. It is a single web page, published by the Aether Project.

Live: https://aether-project-hq.onrender.com/tools/opportunity-brain/

## What it does

- You rate the idea on seven criteria. Each has a rating from 1 to 10 and a weight from 0 to 100.
- You tick whichever of 23 risk flags apply.
- You can save up to five ideas and compare them side by side.

This is a self-assessment worked out from your own answers. It is not advice of any kind, and it is not market research.

## How the score is worked out

Each of the seven criteria has a rating from 1 to 10 and a weight from 0 to 100.

**Score = (sum of rating × weight) ÷ (sum of weights)**, rounded to one decimal place. With equal weights this is the plain average of your seven ratings.

One cap applies: if any criterion with a weight above zero is rated below 3, the score cannot be higher than 5.0. A very weak point is not averaged away by strong ones.

If every weight is zero there is no score.

The word shown with the score only restates it: 8.0 or more is "Strong", 6.0 to 7.9 is "Promising", 4.0 to 5.9 is "Weak", below 4.0 is "Poor".

Risk flags are counted and shown next to the score. They do not change it.

## Your data

Your answers and comparison list are saved in the browser's local storage, if the browser allows it, on that device only. Nothing is sent anywhere: the page makes no network requests and has no account, tracking or cookies. The "Clear my data" button on the page removes what was saved.

## Running it yourself

Open `index.html` in a browser. There is no build step and there are no dependencies.

The "all free tools" link in the page footer points one folder up, which exists on the live site but not in this repository.

## Tests

Run `node --test` in this folder (needs Node.js; the tests run the same script the page runs).

## Terms

Free tool, provided as is, with no support. Licensed under the [MIT licence](LICENSE).
