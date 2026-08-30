Mentor and reviewer headshots
=============================

Drop square JPG/PNG images here (600x600 or larger works well), then point at
them from the data:

  src/lib/mentors.ts   ->  photo: "/mentors/naresh-g.jpg"

For a published review, set the `photo` field on that document in MongoDB
Atlas to the same style of path.

Until a photo is provided, the site shows a gradient monogram of the person's
initials. That is deliberate: we never generate or substitute a stand-in face
for a real named person.

Only publish a photo you have that person's permission to use.
