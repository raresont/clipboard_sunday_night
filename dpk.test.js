const { deterministicPartitionKey, calculateCanditateHash, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the initial partition key when we have an object with partition key less than " + MAX_PARTITION_KEY_LENGTH, ()=>{
    const event = { partitionKey: "The initial partition key" };
    const result = deterministicPartitionKey(event);

    expect(result).toBe(event.partitionKey);
  });

  it('Returns stringifiend hash when partition key is not part of the object', () => {
    const event = { notAParticionKey: 'notAParticionKey' };
    const key = deterministicPartitionKey(event);

    expect(key).toBe( calculateCanditateHash(JSON.stringify(event))
    );
  });

  it('Returns partition key hash when it is longer than ' + MAX_PARTITION_KEY_LENGTH, () => {
    const event = {partitionKey: "1".repeat(MAX_PARTITION_KEY_LENGTH + 2)};
    const key = deterministicPartitionKey( event);

    expect(key).toBe( calculateCanditateHash(event.partitionKey));
  });

});
