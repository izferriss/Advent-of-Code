// --- Day 3: Rucksack Reorganization ---
// One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

// Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

// The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

// The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

// For example, suppose you have the following list of contents from six rucksacks:

// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
// The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
// The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
// The fourth rucksack's compartments only share item type v.
// The fifth rucksack's compartments only share item type t.
// The sixth rucksack's compartments only share item type s.
// To help prioritize item rearrangement, every item type can be converted to a priority:

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
// In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

// Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

// --- Part Two ---
// As you finish identifying the misplaced items, the Elves come to you with another issue.

// For safety, the Elves are divided into groups of three. Every Elf carries a badge that identifies their group. For efficiency, within each group of three Elves, the badge is the only item type carried by all three Elves. That is, if a group's badge is item type B, then all three Elves will have item type B somewhere in their rucksack, and at most two of the Elves will be carrying any other item type.

// The problem is that someone forgot to put this year's updated authenticity sticker on the badges. All of the badges need to be pulled out of the rucksacks so the new authenticity stickers can be attached.

// Additionally, nobody wrote down which item type corresponds to each group's badges. The only way to tell which item type is the right one is by finding the one item type that is common between all three Elves in each group.

// Every set of three lines in your list corresponds to a single group, but each group can have a different badge item type. So, in the above example, the first group's rucksacks are the first three lines:

// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// And the second group's rucksacks are the next three lines:

// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// In the first group, the only item type that appears in all three rucksacks is lowercase r; this must be their badges. In the second group, their badge item type must be Z.

// Priorities for these items must still be found to organize the sticker attachment efforts: here, they are 18 (r) for the first group and 52 (Z) for the second group. The sum of these is 70.

// Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?

let input =
    [
        "MVWpzTTrTFNNLtssjV",
        "hRJncnJCnhPCnBSbCQRhhQRPFHmsbHLzbLNHsjNNFmGGGsGF",
        "lSBQJBBBBcnccnQvBnPQznfrgwlrTZfDwTfWqrrpgMpw",
        "sRPgrzSgrSbfTrgspBPsDWWTmdnvdZWZwTmwvdmd",
        "tVGpCGqCGjlHcNGVNHZDmnZMWdWMWCdZDvnZ",
        "HqpQptLlclLGtlpcjHNhQqfRhrSBrrbfbrSRrsPfBSgg",
        "JpjLbQbFPBjDBBJLWltglfBfhhlcctht",
        "vNFmsdFsnmzGtWvgzhzc",
        "rqwRCCqmCTqHCnqRNTNFsJVMQSjLRbbVVbjQVLbLSV",
        "mLNNCNDwBwDnmCwnJwLRvdlqZclRccsgvcZndc",
        "QWMtVWbpVlgHHcgMHs",
        "VsTVWhThsVQWzjtQPpVWjWbpwJNCJDCzSNNCCCSfmfBCSGLL",
        "NbSfHnwDvwwfHwwQsHbWPgrsZsZjRPLRgLWhWP",
        "lmMlTGFzVmzqjGLLZWWGhrCh",
        "qFclMprqmrvbcnwDQtNQ",
        "tWQZFvvtWQWbqQQggZZLvpLrpzDrmGDmmDHPzPzHrfnHTG",
        "NMlhlTMccTCVBlRNHzJnzDDmnJmnGGBf",
        "NMMSSSSSlNVMdjdNSNNhFwTbvbLqjbtLwWQwZqgg",
        "jPwcJwRmmhJpbhNJVgDbrHzzzQzzBQHg",
        "tdZqlCnnnlvZCqlnlCSqZdFCHGDBgzsDzssBtHGLQtrHsssL",
        "TZZFSdrdlZMFZRMwMPmNcwNmwm",
        "nsdhzmDBGQWQPvJPjbbW",
        "gCgBqCNpMHTwgwqMPRJJTtWjbFRJFJvP",
        "ZlCwBrwgmzhGzDrd",
        "sTBHfcnBTnqHRvqPgFFbLtrQTPLjjm",
        "GWzpwSJSpbwbNNGJPQrrtrrrrgzLtjzm",
        "NNSlCCdplWwplCwSndnssdZfqVbHvfqc",
        "rrfHgqnlllRrDgrCbQfszMPtmzPQzFsFMQ",
        "JJLGVGjcwVcPQNNNtRPmLM",
        "WThVJJWJBdGwBpBTqDrSRCCggShqbSCb",
        "TbCqzqzmbCffzDbHRddLbdRFRS",
        "ZmvZJPjPwwWNZJGtWSDRRDFWSLhhhMVVWL",
        "ZwplGwmptNjZnjvnGGPjJlZppTrTsCczfggBgfgfggCsBrqr",
        "gMBBbfBbBMfnMsvRvWJhDsQW",
        "ZZqHLzczjjsLzlpjqTprNJvhQpRvtRJJQrtQtJ",
        "llZlzZZzPZZqsTZscHczfnSwSPSwwgSBwwSnPwnf",
        "chMtcPPgQtthqgvczhMTcCSBLBlGpsFnBnnsGvLplSFG",
        "bhRmJWDRmHSmFGBnGBps",
        "jdDZWbrDdDbbdbDrRRWwRjZRVqztCzqtcThcTQtgqVMMVzjq",
        "flNmNHgcZwTzRLzMLRPlzz",
        "nntqBJtFbbCbBVCnBtFjJjhVhLzLvRLvgRRvPvpMpvpp",
        "CgJWjJQDjgBtnGNGfcssNfcwNW",
        "MrMpMrGBznjPMGCmCrrjdwndfJLQNfdLQNdNggdL",
        "sJVcZqvhZtVqhDFFsDJslcdwgwvwQwwQNbbTbwfLLTgL",
        "RDDRcsSsstJstVDDqctszzmRmGjpjBRHPmmGHGrj",
        "tdplZtlrBGwTlLQQ",
        "sfsPPvNhWLQBhGQG",
        "zPVfzVbbMcscvVfzzNgcJHnJZgtrrndJqjJqndrL",
        "nglLjRCCHLLCnNCLHQnFNQmmVMbVmwMwlMwMMMWwBTsT",
        "cqtfcqZpzhSvvBfWwbvrbT",
        "PPqpDSqcSJPdPhtPtqZcpPtGjFRFFFNLJFGRgjFbGRNbHn",
        "gjtRSLMqLdSgLMCltTSDQcQQqhDcfcfrWDhWrr",
        "GwFZCwNzFJsPmFFmZmPPNhvDDfDWWmpvQWWfVDQppW",
        "swNGZbPBGwnCgBBlBljl",
        "BsrDsnQGwFFQQtfNTBNSffBgBt",
        "VJlhWVLlRppLQZTCbtZTttgJ",
        "ppLqqRhQdRPhqPVhdPjhljqHFnGnzFrjFFDznHFHrmwwnH",
        "CJMmmJLmlshCCdmzjHjPWztgdnjttt",
        "GwZvGwrgTcFpzHWjnT",
        "GbqrvrRwbrbGbwwZBbgfhmJMmsDJhNRfLChhCh",
        "CfgfjCLCgfgFgBhBsccswQwtsQHvBBtc",
        "SbSMGbnmDMGJWmRmDmvzwtcscWtQzsrPsvHc",
        "DbJdNpJSnMSJmpSSNVqgqgTTFVQTFqdZLq",
        "MBMCmlllPSSlmmPPjCMpPgggJcnZgntJsDvHsDZt",
        "hrNzhrRNbrhbGRbfpVLRGNqqngvnttngJctgDZJGcZvHvZnc",
        "LTTzVqppSmwdTmQW",
        "mmlBQmLbsbmRnFnwlqqprF",
        "dZScZSZSdHcNMDcJwLqRfppzpzfTpHfF",
        "JLWJLJJJdMmGtgCWjQjt",
        "PPMzpVDblwGVMMzDLLjrcrjdzjdTzLjd",
        "RRcCJRcNQRBqtCFBRJJsZWBWrjLWLHZZWndBLWjh",
        "qQQtttNqsqqtJRgqQfcpcgDcbggplGbfMp",
        "QmmSTQPmLSmjpczMJtwPzg",
        "BHHHdwdvDpllvctjZv",
        "HdrDHNfrrBDGGBhBNfHNsLFqmbRQSwqmGTLnTbSF",
        "gcMmgRQPqqPPsgjFSvctCHvHllSSHcvd",
        "JTWfZwhTwzbWwTFTrZnTrDDlDSVtVHLVShtvSHvlHL",
        "bWbWBfzTfwrWJNbTrnzfTwJFpmMQgqsFRsQGqRMggPmPBG",
        "GqCWpGGLpmpWjbSDGjGGmwCzZlvMBTrCvsrlwwswCl",
        "FPFHFVdJgQHJZnslrgvsTrwMlNgw",
        "hQVchcdcZZpZqcDG",
        "JbBRgBsRffgPPFQttQvQQMvG",
        "dmNZgmZVtGTNtNGC",
        "ZqqndLZnccqRbsrgpggsBc",
        "DDvMVmTjwFWPBBTzBF",
        "cqnggcbNNCqbQQqbZbpfQpqgRWlFhLRBhRzRPLFJhlJBfPLh",
        "dpscpcncbbqcpMVSvSrPDMsrjr",
        "hGCGZmVRRcMVsGMtmZWssmFLzbFblnnzfmqbfnzNNb",
        "wjrSPBJdSjjDrggpSJpdrSnlFNlzLTnqNLqqpbqqfMln",
        "dMwPBHPPJHDdvrBBhshWCGcsQRcHRZGV",
        "vdHwhqdtLdVnHBZbFBFzbBPS",
        "TmNCLNDpWfCNmpCgTWNTDMMZlzSggBMzlZlMBlBbZZ",
        "NQfWcscDNQrhqvGLrdhVjh",
        "lZLqzzqvgrCRcQcCLD",
        "HSVVwNTJzwVNTDQrRrrdrBwdhd",
        "TpNTzsfSTVsSpHVppzFpgvvlqZWZPMvMjPPGGsgP",
        "BCMLshLdLDDCgwFRwHHqqRqRWd",
        "QnSqQlGSfpQzTQJNTPNwNPFRFcccHc",
        "mfJJmztnQpGpvnSzGrsqgrhrBBhqjBrthL",
        "BSlmzmlvdNnlQlQQJnJHRVFVFVVqMtqRMfSfCw",
        "WBPsDPBBjfssFHMRRq",
        "DLWpGhbPjbhZrhZDnBQgdNZmQNgmvdzg",
        "WWvgBFgHWChBzgBFbjbtPtnPrsHlsRMrwRrMRR",
        "SGfNpfdGfVpVSGGppSDdwRwclMlfPMwccsntPqPw",
        "TVdpQDSpQZJpVpDQQFBbthvmWzmgvhbjzJ",
        "VVCCbzqdbzhFHvbdhZFPmhCPSNRNGSrPJfTNRSGJfGwPST",
        "LngtBnlcnDvLcTTRfTTwRtGNTG",
        "DpnBjMpLlLDQWDgvpLvbqzmbjzVjVHqbFFqbFq",
        "SbzMbNQQSDdmvqqzdSlWFpwZnvpFWWllpFww",
        "CjLPTPjjLCPtBCLJjBLPLBTFsFFgfwwpZgplpgFnWWRl",
        "nPncrBHGnmrbdmdmNN",
        "FnlblGlTTbNVLVtRvQQvgqRQBCvgNr",
        "DPMDMpMHmnzjPqDhQWvvQvhghq",
        "zMMcddznsjFTldVGlFGT",
        "cLSNGLhmRRVmlVCq",
        "HvzbQBzBMQMpQDpCSlSVZRSCqV",
        "QwWznWnTbQSMMJQHnvwbWjrhNhLFgsGNNrFLNnFNhd",
        "dBrWNQWWcTNqqnNN",
        "bPlmgRgRghlCVlbhwZccCZjZqvmqvmTTvGqmJTvqnGTGvLLJ",
        "DCDZhjllcpDMrSQS",
        "ddtNNTFTwRzGRGCwqnBMjlqMHMfqnB",
        "hDpPsQLLSprhnHVhqhVfHM",
        "QWLWDQZpgpWbQgfspGGRdcGcCcCcztTGZC",
        "GGHFdGwFlswcFtnvTfjMjBFfNBjNBZ",
        "JWmSJLPSRprWWPWVMMVQpZfBvvfQtj",
        "RzPSPDbDDhbhPDLRhCgGHHccsqGCqqtHzG",
        "dbSdptWddDMNtdFvttFclqMTZJlJTlMZqJTJTqjC",
        "BzfwRzrwPzfzLNGmZZCZBTGBqqlH",
        "hVNVQPNQQQVLPwhRrQwgWWvFdDsFWSbdWgdFSFDb",
        "hhSnmhtZSFSqZBJSSqqmJJRHPPLgHtPcGGGcWGtvvHwgvG",
        "fCMpfTQjTrzrzCQMsQdHGHvPGPwLppPRvWPLLc",
        "MdTzCsCMzNzDCTjlmNhRmRnZBllRVh",
        "RrFglccgBVVvFNvCvWlgmDbbDfQDtCdjjDbDwmZD",
        "STnMqSLHJhHHnqLqtnBndbBdfQQZDtZD",
        "GHJPTBsTSsMMSpSBHJFNlWzcvFlzsVzvzgsv",
        "lplNdrVrVrWMMVcJfcDDzbqCCpDL",
        "SSSgvBRSjggPgzvTTRHTvFnfJLbcLsCDLnCLDCcJBsJq",
        "GmHjjRwvHSjHTRjrlZrNMzVMhVrmVW",
        "gdtFtgStSbHCbHMPZrFLPLrVlrVZrP",
        "hQnjMGfDqTvzvpBjVVjPRLRRjJ",
        "QmsQmhvvMtssHtWw",
        "RNjTGSCLJCGdRqMRFvMrfzMvzz",
        "ZpcWcVDpWBmWQMZZpZDpwBcznrshtntvfvhfFtzmvnzvhf",
        "WHHHcVWgQVCbCllbgMLN",
        "ZjjdJHSdSzvcZFMhhhDqDHtthw",
        "rNTlNqVWTmRPlshsDPDlph",
        "WbTNGNmQBRQbRNQgNGmCLdvvjzcCSBqLcLnScL",
        "bZwpSpBvSHCBqNzpdFffqQft",
        "nWRnGRnVnljmlDnzdPfQfdcQPWWfNq",
        "dmRDGMMlDmnVjgMlhBSwCbCgwHbBHhvv",
        "NwqLgLBLgnwNNBGpgsQsddhhpQQg",
        "JcztcZnzVtZvnVcJMTvTJtWtppsQHGdQhhHHQsPhWdPS",
        "fJTJnMmvZvMvRDqFblNBNNjlBf",
        "drZVzZzzNWWzwwTWTZrjWcLCqnRqNnLNLqCqnsPPRL",
        "JhlBgvHBBLnwMBqDwC",
        "GmGFSHmhJSGJwgFJmwJhJhgQVWVdbSWZQzZTrWtZzjzjTz",
        "wPGRPpnzgwwGgLddFBFrnrnJdc",
        "jCsVclQWmCTrJJddrdFs",
        "lWjlCqfmlWccpGPPSgcf",
        "hCThCzTdPcPhzqTzMfVfHrhMMmhVHgVM",
        "lJSJNqwJsZBSsSBFsMprDmFmFDfDDHgHDf",
        "JNGQsSSNGsbZZZSBwZLPtdLjttnqPCbtPbjC",
        "vnlWNpbrNrpShhQDLRLB",
        "MzCjPgffVTVgCJSRQhBdRdJS",
        "VPHcfcBfTzVMTttMzMfgzMfHvrllWvlnvNvlmGwWNwwNmw",
        "BwwsqPJqwBssLlFqLRCDzWwzDGRGGWfSRG",
        "vTtmmthvpphpnNgNvvpvRrDCddDQrCQCzCDrCfnf",
        "pppccNpTVVlqssHHVzBH",
        "HWHphZWVWvMZNvpMtfJZgssffsjJgBlslJ",
        "RLmrFFnGFrFFrrFCRwCrLNPwqfjSJjqJSJBbsqjbbsblfq",
        "LnFLPPGLrGNRQPmndLzPmPmpcDcMHhcMhVHvczcpHHchcV",
        "zwqqvNDVggwqVfNQRlszFBsCCJFtFlFPsz",
        "MSrrGTZPGSSMSjPbTmtlHBBFrFHFsHlsJsct",
        "MnmMPMSZZGSZWmSjnWgfqdgVQDvnqvRDggDV",
        "SQCSBShsQnSsSJswsNpVppPPMVpGpnDVgg",
        "WWjHvmtWZrwvtzzjTTRPrRRrMVNVVGgVGpGR",
        "lTvWjWLfWwbJCQqBSlbB",
        "cjPChhswrNVtMZJjVM",
        "pfvTFvTzLBFndGTlJmVJZmNlCMGtCJ",
        "nfvFTfpbBFdSFpTLswsWDbchwHCWHrbw",
        "lNdNPLJJLHHHlpPJcvtVcsBBrrBvBqrVrC",
        "wDTbwTQRZTMWsVWtmWhhTr",
        "nzRMbSZtMQDnpzzJHLHNflHP",
        "HrwwmwcRbmwcbrrTbwwcrTJWLlPshllhLccqLhnnlljhZhjZ",
        "GMFMSNSpCBSFSdGpNFpBznLlzzhzshlGhhqPhGGL",
        "nFFSCCSSfttBdddDQNDBQpSSrbrmWJwrHfJHWJrbVwWHrgVr",
        "SdddNNCmpNNDhMswhsmbhvHM",
        "frtzqqqFjgrWfgfqtthsnvRHZRRvFlhnvRZb",
        "rtrgqzzrbWtqLGLLtBWzfGcTNCCVGpSNDppTJJVddNpPSG",
        "WWJvJvBgpHSHScQRQSVQLzqL",
        "ddZTlZGZVfQhZRLLMqsR",
        "rPfwrGGrFjjNTGNCCVBggDJHmNDvbmmpmNJJ",
        "bbGrJPRVPtfsVfFlMjBV",
        "WQzhQQQNZQCWNnQDhzWdNjFZggmlHjjmMmMFjFHpMs",
        "CzQCSWDTWhNhzWhTGJwtRRqTblwcclvP",
        "HLDvZgZldDTnLLsswMpVLn",
        "FNVQzQSPznCMmpBwCF",
        "SqfJPfttqffjJPVlhvhZZtvdVDRZ",
        "jVsLvHvvdrSjpJFsGzmnmltnml",
        "nTNTRCTBTmmmFPMJ",
        "CQnCggWQDgBrrSqHjDDfSS",
        "ZpNlrZNcmctZbcZlmcmZhhpPvPHvwBMHJPMTMHBTFJvJ",
        "zmdCnGzGRnLDjQnzPvMFVHMVMLTVwMJv",
        "GGjqssqgzCnCzQsshcffmrbNrrNZtW",
        "DNpTwhpLlWMDWNMhbJjGttJFHgDcjtjG",
        "wqQrdCdqbFtCtJtJ",
        "vffdrwfPrsmqVBBWRVlRRlTSTWSTlR",
        "ZqTCTQQTFvsDSsBDvWBd",
        "hfBLzRLtHHLDDWRRWWDNbd",
        "pHhhnPzLfJcJhzHLzZjcmwCTqTQgwBqqwg",
        "WJHgqgFqrVrqgqCHwsJHHVFZzppZFGGfTtpcfbdpzzpd",
        "RvNMQlMBhwMdMfcpbM",
        "LLRQNBDSSNSwmDDBQRBRBCHsgrgHLVnJVqLsJsnCPJ",
        "BFhGsDsDsBtsPGtQDrrMdbdrffrffbJbRt",
        "cVVqScVSWWvVWgVZjnrHJgLfdrLrnrLLLQ",
        "WmvqNZzzzZSvVzqvcccSzSmqFGCDTGBPQGDhwCDhNDCwPBQp",
        "RqTlHHTTrQqHlTqsrVDqHbrZFZwhpBhphZBFhZpDpLLLfB",
        "nSzGCGdvzdGNPBQQBfhLZfFwFN",
        "WPPPCJMtJSQMJQCCWMJslRrrRgrMRbRqVqqTRR",
        "BMtfLsLZfTPmCtGWZrZqJNJqvpZdWr",
        "bRwgHhhRhbbSRbjSglcgwHHJWPcJdPrnNWrnqnWVVqpdnq",
        "bgjlSgDljHhjgwMPCLPFDMFPGGBC",
        "zJWjczcWjSWghZgzgSSSZflTqwlfqTTbnQwhdTnMdl",
        "NrGVCmNpHFPsrJFbFQMJbJdQTn",
        "JvrtpHHmrCGJCJmNvNpVCsHVgzWgWDDcjjgjDRStWWDLSgzz",
        "HzdFsBBVsfnTfsPmPtDcZqtMhDDz",
        "wrjjRQLlwwwrJQLQbCrbwlJDSlcSDtPZmPSDclWDtcDqWh",
        "RwgprLbNLrLbCCpRCrJLRLFfsGTNNZHBZnnBvvfffnvd",
        "MlqqlWZclnPtZtDSSvwQQjgQpNQSRM",
        "rLJTsBrsJBhshTNNwSQBWNvNgNSg",
        "JbbbChCHsJzHzbWdGHThlFnnPqlPlGPPGncPtFlD",
        "WcMVvwNNvjRcwTQwVcpNRcspPCFtbPztbCTFmtPtCJtbCzmz",
        "grrgDhrnDLnLrdfdLZlLZhmCqzlCbtJlSSStFmttqsJJ",
        "GHHDdgnLDDhrrrgZrZgLNVVVVcRNvcwjWvpWGcRs",
        "qhGhPSJtGhGtJtvNjnJjnvmNQQmj",
        "sRBFlbZsrdBRRGbVGBDwDMDQwQwMNDjjjVNV",
        "CzCflffbBszdBCbdbrtLcfhhgHLGgPccLSPh",
        "zShhHFzgJWFVFFHFHhRPNjwqPLPtLbtrbwVjjr",
        "ssnvTmvCDfpCZTnsfCqwNLNPwbJqNJPwrjZw",
        "vDvpmcnmnBDnsnJTJmQWMHMWzScFggRFRFSW",
        "nnVHHPLrnpssLnrpLRnHtHrjJcCdzCjcDzMzdqwRdjdDcJ",
        "WWTGQQzSGWlTmBbDJJjwMJjcvvlDjw",
        "TGTWBTWmTbgzghZhgzBgpVNrZPPfntfNrVLNNnZP",
        "TqhQnqqLnnqddttNqQWdtqQmppSSFFClRmzmFZFLSmSlFF",
        "BcHjGclVPPBrVrcjrGGDrMgcmmRJbRCFzpZmSDRpRZJJmRzz",
        "ccGjMgvPvsHMgvBHWlhQdqwtllwNdThs",
        "WjddwRGgHRRdMbrwHRwWjHDtDZplslnJnZrsDvCprJPJ",
        "QSLLFqQBffCFststlFnn",
        "CSSmSqzmVVjWMdMjVWgT",
        "lTfQRhVpRzjThpRQTTTlvHrvBvHnPMHgHqHJvn",
        "cGDctCwCdDCGSFcJsFJsFBvgnMBrHvvrqngHgmgssg",
        "SCbSDSFScNpfbRVVJf",
        "RrwmdwMVjMjMTghDWNTJDpWfWG",
        "SbPvNbvbSsPbSvZsPJtJWhHpGGGgJWgJ",
        "lSFvsLNcqzqLrwnFQMnVdmnn",
        "FgCJFTWntWTFtPLmJmmQJmCMMpljWZBwlGMljjjlwvwBvZ",
        "SDSbVbdScSDzbLZMBrjlZpVrZp",
        "ccsSDhSDffzbLNscfcfDcgqhPgTntqmnQmCgtgQCTJ",
        "VnCnrHnPPrCwHmVWtqfMQQqzCqffCZ",
        "DDbDcJJJbpJDGppFpqGZRWfGfddzMWtfWM",
        "tTTglDcgFjwNPHPPwHlH",
        "bMGbqqgPqqVVMGnbVqSMmRfPcJmCTPDDLJDTCmDm",
        "FFjjZvFRsFCctmtvtJWD",
        "wwFhHjQjwQhZrFjQbngglGbRMnSzgbRH",
        "GPTTJSgTPrPPmcTPpdJsGGGjqbRvqlztqlRqMzGjRv",
        "LwnfWLNwwHHQwHnjbbMMjWttqtMmMj",
        "mhwfBDhnQTpJBcBJps",
        "HQQHwMfwlltzMlVljQhVjjHPPPFGPFcCGprPTPPfDrDcGf",
        "pRLdvRvJgqLRBSJCcvFnCDTPTcTGnT",
        "LBLSJbRSLSqbSdBdgJRRqRbwjHHblQttlwtwhzpjMlwhpw",
        "NWLNSNSDtgSgghgdcwccmwGntwclnT",
        "FRCQzJRsvfVVjvzFJfQnffwCcmdwmHmmHmTwmCmdGBcq",
        "sjfJvjfzPRPzvPPVFMssvSLhSSWrMZnSDNrDDhSLZZ",
        "FvLpSLtCfPCWhRSZZMZJSW",
        "jbbjwbHjQmHjHsQrQFMnwTnJznwRzhJRnNTM",
        "gVrjqGqjgrgsFGLDtDBLLfLB",
        "cgTvRWWLVScRWflNJJDfVJmVlG",
        "nPPnnmqjmZHCHBHFdfwNsDhzzfJznhsfhw",
        "bddmQqQjpdFCQWtLQMMSvMMQRS",
        "wjnmPwCgjPnRlwnmvmvvPnTwbSSLLvsLDWdbbWzvsLzWbzbz",
        "NqrGqFHqJlfhhJGbszdWQzzLNtQDzz",
        "FfHFpphrJqJrpGBffcTnBjCnVTMjMRCnVljT",
        "SrfSJGJpSgMprMHdhBGhsdsshdGsmm",
        "nRTRPvQllQlblwvCjTwLTnvBqdhmHDPVsmDmdqshDVhNsP",
        "lbRFHvRwlnlLbnbjLbLjLCzggSpWfMFzSZpzZFJJWpJr",
        "vNLlFldlvPtHFPHQRt",
        "jcpRsScDgshzjqzfVStntBTPMTnmWttntMpp",
        "fSssgVjDsbqSVbCJClLRJLCZRZZb",
        "wnHmCJccDDcrNnrNMRDtTzpTlMpTzpBp",
        "PjSPPGjWjLzTjjMtzzMj",
        "hWvLLFWvHvczVcVn",
        "jgtngnnhMthcnLjMgCZvChDsmdNCvNNZDN",
        "bWqFPbFbLzRFfZBNDNNPZsNd",
        "RbJzGpzVLLLWHHQgTMwcTptQ",
        "sJBhsMWQnhhrFBsFhlQQMfrDCDpLlVCddjTdDDpqDLTLdj",
        "tZHHSRmNHcgmNzpDPJtttqjLqdpL",
        "HbNbZmcHQJbsFWvs",
        "VgPNWGbgSjGjfhRRFfzThtmtzF",
        "qLCQJBqqcPPmLHhHFz",
        "CcJvplQswNgZlNPSbS"
    ]
const alpha = new Map();
alpha.set('a', 1);
alpha.set('b', 2);
alpha.set('c', 3);
alpha.set('d', 4);
alpha.set('e', 5);
alpha.set('f', 6);
alpha.set('g', 7);
alpha.set('h', 8);
alpha.set('i', 9);
alpha.set('j', 10);
alpha.set('k', 11);
alpha.set('l', 12);
alpha.set('m', 13);
alpha.set('n', 14);
alpha.set('o', 15);
alpha.set('p', 16);
alpha.set('q', 17);
alpha.set('r', 18);
alpha.set('s', 19);
alpha.set('t', 20);
alpha.set('u', 21);
alpha.set('v', 22);
alpha.set('w', 23);
alpha.set('x', 24);
alpha.set('y', 25);
alpha.set('z', 26);
alpha.set('A', 27);
alpha.set('B', 28);
alpha.set('C', 29);
alpha.set('D', 30);
alpha.set('E', 31);
alpha.set('F', 32);
alpha.set('G', 33);
alpha.set('H', 34);
alpha.set('I', 35);
alpha.set('J', 36);
alpha.set('K', 37);
alpha.set('L', 38);
alpha.set('M', 39);
alpha.set('N', 40);
alpha.set('O', 41);
alpha.set('P', 42);
alpha.set('Q', 43);
alpha.set('R', 44);
alpha.set('S', 45);
alpha.set('T', 46);
alpha.set('U', 47);
alpha.set('V', 48);
alpha.set('W', 49);
alpha.set('X', 50);
alpha.set('Y', 51);
alpha.set('Z', 52);

let sum = 0;

// //PART 1
// for(var i = 0; i < input.length; i++)
// {
//     let firstHalf = input[i].substring(0, (input[i].length / 2));
//     let secondHalf = input[i].substring(input[i].length / 2);
//     console.log(firstHalf);
//     console.log(secondHalf);
//     let count = 0;
//     while(count < firstHalf.length)
//     {
//         if(secondHalf.indexOf(firstHalf[count]) > -1)
//         {
//             break;
//         }
//         else
//         {
//             count++;
//         }
//     }
//     sum += alpha.get(firstHalf[count]);
// }

//console.log(sum);

//PART 2
for(var i = 0; i < input.length; i += 3)
{
    let groupMember1 = input[i];
    let groupMember2 = input[i + 1];
    let groupMember3 = input[i + 2];

    let count = 0;
    while(count < groupMember1.length)
        {
            if(groupMember2.indexOf(groupMember1[count]) > -1 && groupMember3.indexOf(groupMember1[count]) > -1)
            {
                break;
            }
            else
            {
                count++;
            }
        }

    sum += alpha.get(groupMember1[count]);
}

console.log(sum);
