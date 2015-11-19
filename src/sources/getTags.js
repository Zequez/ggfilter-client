// This is used on development, as in production
// we are going to pre-load the list of tags on the server
// before the application is rendered for the first time
export default function getTags(fun) {
  return fetch(`http://localhost:3000/tags.json`)
    .then(response => response.json())
    .then(fun)
}
