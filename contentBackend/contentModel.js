const knex = require('knex')(require('../knexfile')['development']);

async function createContent(user_id, title, description) {
    return await knex('content').insert({ user_id, title, description });
}

async function deleteContentById(id) {
    return await knex('content').where({ id }).del();
}

async function updateContent(user_id, contentId, title, description) {
    const date = new Date();
    return await knex('content').where({ id: contentId }).update({ title, description, date });
}

async function getAllContent() {
    return await knex('content').select();
}

async function getContentById(id) {
    return await knex('content').where({ id }).first();
}

module.exports = {
    createContent,
    deleteContentById,
    updateContent,
    getAllContent,
    getContentById
};
