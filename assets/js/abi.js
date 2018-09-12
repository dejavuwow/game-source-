export default [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "playerID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "playerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "ethOut",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "onWithdraw",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "activate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_luckNum",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_pID",
				"type": "uint256"
			},
			{
				"name": "_addr",
				"type": "address"
			},
			{
				"name": "_name",
				"type": "bytes32"
			},
			{
				"name": "_laff1",
				"type": "uint256"
			},
			{
				"name": "_laff2",
				"type": "uint256"
			},
			{
				"name": "_laff3",
				"type": "uint256"
			}
		],
		"name": "receivePlayerInfo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "compressedData",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "compressedIDs",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "playerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "ethIn",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "keysBought",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "winnerAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "winnerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "amountWon",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "newPot",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "P3DAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "genAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "potAmount",
				"type": "uint256"
			}
		],
		"name": "onEndTx",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "playerID",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "playerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "playerName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "isNewPlayer",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "affiliateID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "affiliateAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "affiliateName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "amountPaid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "onNewName",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_pID",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "bytes32"
			}
		],
		"name": "receivePlayerNameList",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_nameString",
				"type": "string"
			},
			{
				"name": "_affCode",
				"type": "address"
			},
			{
				"name": "_all",
				"type": "bool"
			}
		],
		"name": "registerNameXaddr",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_nameString",
				"type": "string"
			},
			{
				"name": "_affCode",
				"type": "uint256"
			},
			{
				"name": "_all",
				"type": "bool"
			}
		],
		"name": "registerNameXID",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_nameString",
				"type": "string"
			},
			{
				"name": "_affCode",
				"type": "bytes32"
			},
			{
				"name": "_all",
				"type": "bool"
			}
		],
		"name": "registerNameXname",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_eth",
				"type": "uint256"
			},
			{
				"name": "_luckNum",
				"type": "uint256"
			}
		],
		"name": "reLoad",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "activated_",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_rID",
				"type": "uint256"
			},
			{
				"name": "_eth",
				"type": "uint256"
			}
		],
		"name": "calcKeysReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "fees_",
		"outputs": [
			{
				"name": "gen",
				"type": "uint256"
			},
			{
				"name": "token",
				"type": "uint256"
			},
			{
				"name": "pot",
				"type": "uint256"
			},
			{
				"name": "aff1",
				"type": "uint256"
			},
			{
				"name": "aff2",
				"type": "uint256"
			},
			{
				"name": "aff3",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBuyPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCurrentRoundInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_nID",
				"type": "uint256"
			},
			{
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "getNum_",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getPlayerInfoByAddress",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_pID",
				"type": "uint256"
			}
		],
		"name": "getPlayerVaults",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeLeft",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_keys",
				"type": "uint256"
			}
		],
		"name": "iWantXKeys",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "lastPotTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nID_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "num_",
		"outputs": [
			{
				"name": "keys",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "numLucks_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "numPlyr_",
		"outputs": [
			{
				"name": "lkeys",
				"type": "uint256"
			},
			{
				"name": "lnid",
				"type": "uint256"
			},
			{
				"name": "pkeys",
				"type": "uint256"
			},
			{
				"name": "pnid",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "pIDxAddr_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "pIDxName_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "plyr_",
		"outputs": [
			{
				"name": "addr",
				"type": "address"
			},
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "win",
				"type": "uint256"
			},
			{
				"name": "gen",
				"type": "uint256"
			},
			{
				"name": "aff",
				"type": "uint256"
			},
			{
				"name": "lrnd",
				"type": "uint256"
			},
			{
				"name": "withdraw",
				"type": "uint256"
			},
			{
				"name": "eth",
				"type": "uint256"
			},
			{
				"name": "mask",
				"type": "uint256"
			},
			{
				"name": "laff1",
				"type": "uint256"
			},
			{
				"name": "laff2",
				"type": "uint256"
			},
			{
				"name": "laff3",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "plyrNames_",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "plyrNum_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "plyrRnds_",
		"outputs": [
			{
				"name": "eth",
				"type": "uint256"
			},
			{
				"name": "keys",
				"type": "uint256"
			},
			{
				"name": "mask",
				"type": "uint256"
			},
			{
				"name": "ico",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rID_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rndTmEth_",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "round_",
		"outputs": [
			{
				"name": "plyr",
				"type": "uint256"
			},
			{
				"name": "team",
				"type": "uint256"
			},
			{
				"name": "end",
				"type": "uint256"
			},
			{
				"name": "ended",
				"type": "bool"
			},
			{
				"name": "strt",
				"type": "uint256"
			},
			{
				"name": "keys",
				"type": "uint256"
			},
			{
				"name": "eth",
				"type": "uint256"
			},
			{
				"name": "pot",
				"type": "uint256"
			},
			{
				"name": "mask",
				"type": "uint256"
			},
			{
				"name": "ico",
				"type": "uint256"
			},
			{
				"name": "icoGen",
				"type": "uint256"
			},
			{
				"name": "icoAvg",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]