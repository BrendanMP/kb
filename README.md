# Keyboard Battle 
Keyboard Battle (kb) is a two player party game played on the same keyboard. The winner of a round KB is the player who's word is successfully entered first.

## Rules
  * Player must complete their given word before the other player.
  * If the same letter is active and share the same index value both players advance on key input.
  * If the same letter is active and a player has more matched characters in their current word, the player with fewer matched characters receives that letter.
  * The game is over when the word list is exhausted.

## Work in Progress... 
[Playable Here](https://brendanmp.github.io/kb/)

### To Do
  * Add styling to the active characters.
  * Instructions Screen
  * Improve UI (Launch screen, etc.)

### Bugs
  * Need to add tie round logic.
  * Find the culprit for occasionally adding two letters to the player not in the lead. This only happens if the two next characters are the same. Case: 'Smoomcake' v 'Groindogs'. If P2 is entering the second 'o' in Groindogs and P1's active letter is the first 'o' in Smoomcake, P1 semes to recieve both 'o's.