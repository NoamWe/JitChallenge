var cmd = require('node-cmd');

async function clone(link, name ) {
    await cmd.run(`git clone ${link} repos/${name}`)
    console.log(`cloned ${link}`)
}

module.exports = {
    clone
}