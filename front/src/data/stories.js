// Placeholder content until the backend serves real stories.
const photo = (seed, w = 400, h = 400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const sections = ['Tech', 'Reviews', 'Science', 'Entertainment', 'AI', 'Policy']

export const hero = {
  title: 'Inside the race to build the first private space station',
  subhead:
    'Three companies are competing to replace the ISS before it is retired. Only one has hardware in orbit.',
  author: 'Mara Chen',
  date: 'Oct 28',
  comments: 214,
  image: photo('station', 1200, 900),
}

export const topStories = [
  { title: 'The new flagship phones are here, and they all look the same', author: 'Dev Patel', date: 'Oct 28', comments: 88, image: photo('phone', 120, 120) },
  { title: 'Regulators open an inquiry into AI model licensing deals', author: 'Sam Ortiz', date: 'Oct 28', comments: 41, image: photo('court', 120, 120) },
  { title: 'This e-ink tablet finally gets handwriting right', author: 'Lena Park', date: 'Oct 27', comments: 63, image: photo('tablet', 120, 120) },
  { title: 'A streaming price hike is coming to every tier next month', author: 'Ari Cohen', date: 'Oct 27', comments: 152, image: photo('tv', 120, 120) },
]

export const freeToRead = [
  { title: 'How a tiny lab is mapping the deep ocean floor with drones', author: 'Noor Haddad', image: photo('ocean', 160, 160) },
  { title: 'The quiet comeback of the wired headphone', author: 'Jules Martin', image: photo('headphones', 160, 160) },
  { title: 'What happens to your data when an app shuts down', author: 'Rui Silva', image: photo('server', 160, 160) },
]

export const stream = [
  { title: 'We tested every foldable on the market for a month', author: 'Lena Park', date: 'Oct 28', comments: 97, image: photo('fold', 480, 320) },
  { title: 'The open-source browser engine nobody expected to survive', author: 'Dev Patel', date: 'Oct 28', comments: 35, image: photo('code', 480, 320) },
  { title: 'Electric bikes are getting cheaper, and lighter', author: 'Mara Chen', date: 'Oct 27', comments: 58, image: photo('bike', 480, 320) },
  { title: 'Inside the studio rebuilding a classic game from scratch', author: 'Ari Cohen', date: 'Oct 27', comments: 120, image: photo('arcade', 480, 320) },
]

export const following = [
  { title: 'A closer look at the chip shortage that never fully ended', author: 'Sam Ortiz', date: 'Oct 28', comments: 22, image: photo('chip', 480, 320) },
  { title: 'Why satellite internet pricing keeps changing', author: 'Noor Haddad', date: 'Oct 26', comments: 47, image: photo('dish', 480, 320) },
]

export const mostPopular = [
  { title: 'The best laptops you can buy right now', author: 'Jules Martin', date: 'Oct 28' },
  { title: 'Your smart speaker is about to lose a feature', author: 'Rui Silva', date: 'Oct 27' },
  { title: 'The rover that drove farther than planned', author: 'Mara Chen', date: 'Oct 27' },
  { title: 'Everything announced at this week’s hardware event', author: 'Dev Patel', date: 'Oct 26' },
]

export const podcasts = [
  { title: 'Is the smartphone finished getting better?', author: 'The Weekly Signal', date: 'Oct 28' },
  { title: 'The real cost of training a frontier model', author: 'Decoded', date: 'Oct 26' },
  { title: 'Reviewing the year’s strangest gadgets', author: 'The Weekly Signal', date: 'Oct 25' },
]
