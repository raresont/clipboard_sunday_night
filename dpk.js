const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const calculateCanditateHash = (data) => { return crypto.createHash('sha3-512').update(data).digest('hex'); }

const deterministicPartitionKey = (event) => {

  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate;

  if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = calculateCanditateHash(data);
  }
  console.log(candidate)

  if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
  }

  //here canditate should be a string
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return calculateCanditateHash(candidate);
  }

  return candidate;
};

exports.calculateCanditateHash = calculateCanditateHash;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;
exports.deterministicPartitionKey = deterministicPartitionKey;