export const loadPost = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')

  const [posts, photos] = await Promise.all([postsResponse, photoResponse]);

  const postsJson = await posts.json();
  const photoJson = await photos.json();

  const postAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photoJson[index].url }
  });

  return postAndPhotos;
}