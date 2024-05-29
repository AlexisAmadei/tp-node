const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
  try {
    const userExist = await knex.schema.hasTable('users');
    const authExist = await knex.schema.hasTable('auth');
    const content = await knex.schema.hasTable('content');
    const reactions = await knex.schema.hasTable('reactions');
    if (!userExist) {
      await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('password');
      });
      console.log('La table "users" a été créée avec succès.');
    } else {
      console.log('La table "users" existe déjà.');
    }
    if (!authExist) {
      await knex.schema.createTable('auth', table => {
        table.increments('id').primary();
        table.integer('user_id');
        table.date('date').defaultTo(knex.fn.now());
      });
      console.log('La table "auth" a été créée avec succès.');
    } else {
      console.log('La table "auth" existe déjà.');
    }
    if (!content) {
      await knex.schema.createTable('content', table => {
        table.increments('id').primary();
        table.integer('user_id');
        table.string('title');
        table.string('description');
        table.date('date').defaultTo(knex.fn.now());
    });
      console.log('La table "content" a été créée avec succès.');
    } else {
      console.log('La table "content" existe déjà.');
    }
    if (!reactions) {
      await knex.schema.createTable('reactions', table => {
        table.increments('id').primary();
        table.integer('content_id');
        table.integer('user_id');
        table.string('comment');
        table.boolean('like');
        table.date('date');
      });
    } else {
      console.log('La table "reactions" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();