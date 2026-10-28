# RanColor

A small browser game about matching colors. The board shows 40 random colors. Pick two at a time, and the closer they are, the higher your score.

## How to play

1. Click (or tap) a color to pick it.
2. Click a second color to compare it with the first. The pair disappears and you get a match score.
3. Changed your mind? Click the picked color again to cancel it.
4. Keep going until the board is empty, then hit the refresh button in the middle to play again.

Hit **New Colors** at any time to start over with a new set of colors.

## Scoring

Each pair is scored by comparing its red, green and blue values:

```
channel score = 100 - |a - b| × 100 / 255
match score   = average of the three channel scores
```

| Box          | Shows                                              |
| ------------ | -------------------------------------------------- |
| Matched      | The score of the last pair you picked              |
| Average      | Your average match score this round                |
| Best Match   | Your best single match this round                  |
| Best Average | Your best finished-round average this session      |

## Running it

No build step or dependencies. Open `index.html` in a browser, or serve the folder with any static server:

```
npx serve .
```

It works on desktop and mobile. On phones the board switches to a 5 × 8 grid so the colors are easier to tap.

## Files

```
index.html   page layout
styles.css   styling and responsive layout
index.js     game logic, scoring and sounds
assets/      background, icons and sound effects
```
