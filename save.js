// App.js - Utilisation des opérations CRUD avec Knex

const userdb = require('./userBackend/userModel');
const contentdb = require('./contentBackend/contentModel');
async function main() {
  // create content
  console.log(await contentdb.getAllContent());

  // delete content
  // await contentdb.deleteContentById(1);
  // console.log('Deleted content with id 1');

  // update content
  await contentdb.updateContent(1, 2, 'Edit du titre', 'Edit de la description');
  process.exit(0);
}

main().catch(err => console.error(err));
