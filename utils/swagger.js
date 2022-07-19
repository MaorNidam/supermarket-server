const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');

const endpointFilesArray = [];

fs.readdirSync('../controllers/').forEach(file => {
	endpointFilesArray.push(`../controllers/${file}`);
});

const outputFile = './swagger_output.json';
(async () => {
	await swaggerAutogen(outputFile, endpointFilesArray);
	require('../app');
})();

