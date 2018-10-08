UPDATE talk
SET category = 'development'
WHERE id IN (
    45, 64, 21, 40, 1, 28, 6, 4, 25, 24, 5, 70, 30, 26, 12, 36, 35, 49
);

UPDATE talk
SET category = 'product'
WHERE id IN (
    67, 66, 8, 52, 71, 46, 15, 13, 18, 10, 41, 65, 51, 75, 89, 33
);

UPDATE talk
SET category = 'devops'
WHERE id IN (
    31, 48, 7, 27, 43
);

UPDATE talk
SET category = 'careers'
WHERE id IN (
    81, 9, 20, 56, 57, 68, 38, 55, 50, 82, 60
);
