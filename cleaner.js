var cmd = require('node-cmd');

async function clean(){
    await cmd.run(`rm -rf repos`)
    console.log(`deleted repos`)
}

module.exports = {
    clean
}