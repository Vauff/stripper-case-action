const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

try
{
	const stripperPath = core.getInput("stripper-path");
	const filenames = fs.readdirSync(stripperPath);
	let passCount = 0;
	let failCount = 0;

	console.log("Verifying all stripper configs are lower case...");

	filenames.forEach((file) => {
		if (file.toLowerCase() !== file)
		{
			failCount++;
			console.log(`${file} is not in lower case`);
		}
		else
		{
			passCount++;
		}
	});

	if (failCount === 0)
		console.log(`${passCount} stripper config filename${passCount > 1 ? "s" : ""} successfully verified as lower case!`);
	else
		core.setFailed(`${failCount} stripper config filename${failCount > 1 ? "s" : ""} failed the lower case check!`);
}
catch (error)
{
	core.setFailed(`An unexpected error occured: ${error.message}`);
}