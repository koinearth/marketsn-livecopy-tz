//  Ref: https://api.tzstats.com/explorer/config/head
const MAX_STORAGE_LIMIT_IN_BYTES = 60000;
const MAX_GAS_LIMIT = 1040000;
const DEFAULT_OFFSET_FOR_TXN = 64;

const MAX_BLOCKS_TO_WAIT_FOR = 6;

module.exports = {
  MAX_STORAGE_LIMIT_IN_BYTES,
  MAX_GAS_LIMIT,
  DEFAULT_OFFSET_FOR_TXN,
  MAX_BLOCKS_TO_WAIT_FOR,
};
