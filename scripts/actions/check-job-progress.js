const fetchAndDeserialize = require('./fetch-and-deserialize');
const { vendorRequest } = require('./utils/vendor-request');

const checkJobStatus = async (batchUid) => {
  const {
    response: {
      data: { status },
    },
  } = await vendorRequest(
    'GET',
    `https://api.smartling.com/jobs-api/v3/projects/${project}/jobs/${batchUid}`
  );

  return status === 'COMPLETED';
};

const main = async () => {
  //get list of current job batch uids from dyanmoDB, for each one execute checkJobStatus
  try {
    ///const isCompleted = checkJobStatus(batchUid);
    const isCompleted = true;

    if (isCompleted) {
      await fetchAndDeserialize();
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error(`[!] Unable to check job status`);
    console.log(error);
    process.exit(1);
  }
};

main();