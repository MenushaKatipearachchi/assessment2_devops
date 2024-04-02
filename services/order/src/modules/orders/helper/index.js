export const getOrderAggregateOptions = (filters, sorts, page, limit) => {
  const aggregateOptions = [];

  if (filters && Object.keys(filters).length > 0) {
    aggregateOptions.push({ $match: filters });
  }

  aggregateOptions.push({
    $lookup: {
      from: "users",
      localField: "buyer",
      foreignField: "_id",
      pipeline: [
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
          },
        },
      ],
      as: "buyer",
    },
  });

  aggregateOptions.push({
    $lookup: {
      from: "products",
      localField: "products.product",
      foreignField: "_id",
      pipeline: [
        {
          $project: {
            _id: 1,
            title: 1,
            price: 1,
            seller: 1,
          },
        },
      ],
      as: "productsDetails",
    },
  });

  aggregateOptions.push({
    $addFields: {
      productsDetails: {
        $map: {
          input: "$products",
          as: "prod",
          in: {
            $mergeObjects: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$productsDetails",
                      cond: { $eq: ["$$this._id", "$$prod.product"] },
                    },
                  },
                  0,
                ],
              },
              "$$prod",
            ],
          },
        },
      },
    },
  });

  aggregateOptions.push({
    $addFields: {
      productsDetails: {
        $map: {
          input: "$productsDetails",
          as: "op",
          in: {
            $mergeObjects: [
              {
                cancellationDetails: {
                  $let: {
                    vars: {
                      index: {
                        $indexOfArray: ["$products.product", "$$op._id"],
                      },
                    },
                    in: {
                      $arrayElemAt: [
                        "$products.cancellationDetails",
                        "$$index",
                      ],
                    },
                  },
                },
              },
              "$$op",
            ],
          },
        },
      },
    },
  });

  // aggregateOptions.push({
  //   $lookup: {
  //     from: "products",
  //     localField: "products.product",
  //     foreignField: "_id",
  //     pipeline: [
  //       {
  //         $project: {
  //           _id: 1,
  //           title: 1,
  //           price: 1,
  //           seller: 1,
  //         },
  //       },
  //       // {
  //       //   $lookup: {
  //       //     from: "users",
  //       //     localField: "seller",
  //       //     foreignField: "_id",
  //       //     pipeline: [
  //       //       {
  //       //         $project: {
  //       //           _id: 1,
  //       //           name: 1,
  //       //         },
  //       //       },
  //       //     ],
  //       //     as: "seller",
  //       //   },
  //       // },
  //     ],
  //     as: "productsDetails",
  //   },
  // });

  // aggregateOptions.push({
  //   $addFields: {
  //     productsDetails: {
  //       $map: {
  //         input: "$productsDetails",
  //         as: "op",
  //         in: {
  //           $mergeObjects: [
  //             {
  //               quantity: {
  //                 $let: {
  //                   vars: {
  //                     index: {
  //                       $indexOfArray: ["$products.product", "$$op._id"],
  //                     },
  //                   },
  //                   in: {
  //                     $arrayElemAt: ["$products.quantity", "$$index"],
  //                   },
  //                 },
  //               },
  //             },
  //             "$$op",
  //           ],
  //         },
  //       },
  //     },
  //   },
  // });

  // aggregateOptions.push({
  //   $addFields: {
  //     productsDetails: {
  //       $map: {
  //         input: "$productsDetails",
  //         as: "op",
  //         in: {
  //           $mergeObjects: [
  //             {
  //               cancellationDetails: {
  //                 $let: {
  //                   vars: {
  //                     index: {
  //                       $indexOfArray: ["$products.product", "$$op._id"],
  //                     },
  //                   },
  //                   in: {
  //                     $arrayElemAt: [
  //                       "$products.cancellationDetails",
  //                       "$$index",
  //                     ],
  //                   },
  //                 },
  //               },
  //             },
  //             "$$op",
  //           ],
  //         },
  //       },
  //     },
  //   },
  // });

  if (sorts && Object.keys(sorts).length > 0) {
    aggregateOptions.push({ $sort: sorts });
  }

  // Add the skip and limit stages if page and limit are provided
  if (page && limit) {
    const startIndex = (page - 1) * limit;
    aggregateOptions.push({ $skip: startIndex }, { $limit: parseInt(limit) });
  }

  return aggregateOptions;
};
