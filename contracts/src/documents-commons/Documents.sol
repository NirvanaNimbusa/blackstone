pragma solidity ^0.4.23;

/**
 * @title Documents Library
 * @dev Defines data structures common to documents
 */
library Documents {

	// enum State {DRAFT, FINAL, EFFECTIVE, CANCELED}

	struct HoardGrant {
		bytes32 hoardAddress;
		bytes32 secretKey;
	}

	struct DocumentVersion {
			string hash;
			uint created;
			address creator;
			// uint state;
	}
}