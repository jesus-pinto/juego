/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🎁',
  'PLAYER': '💀',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '❤️',
};

const maps = [];
maps.push(`
  -IXXXXXXXX
  -XXXXXXXXX
  --XXXXXXXX
  X-X-XXX-XX
  --XXXXXXXX
  -XXXXXXXXX
  --X-----XX
  X-XXXXXXXX
  --XXXXXXXX
  OXXXXXXXXX
`);

maps.push(`
  -OX-XX-XX-
  ---XX-XXX-
  XX------XX
  X---X-XXX-
  X-X-X---XX
  --X-XX-X--
  -X--XX---X
  -X-X-XXX-X
  -XX-IX-X--
  ---X-----X
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXX---X
  XX-----X-X
  XXXXXXX--X
  XX------XX
  XX-XXXXXXX
  XX--OX-XXX
  XXXXXXXXXX
`);
maps.push(`
  OXX---X--I
  -XX-X-X-XX
  ----X-X---
  XXXXX-XXX-
  ----X---X-
  -XX-XXX-X-
  -XX-----X-
  -XXXXXXXX-
  -X----XXX-
  ---XX-----
`);
maps.push(`
  IXX--XXXXO
  -X---XXXX-
  -X-X-X----
  -X-X-X-XXX
  -X-X-X-XXX
  -XXX-----X
  -X-XXXXX-X
  --X--X---X
  X---XX-XXX
  X-X----XXX
`);
maps.push(`
  O-X------X
  -X-X-X-X--
  ---X--XX-X
  XX-XIX----
  ----X--XX-
  XX--X-----
  ---X-XX-XX
  -X----X--- 
  -X-XX--X-X
  ---X-----X
`);


