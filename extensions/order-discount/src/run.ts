import type {
  RunInput,
  FunctionRunResult
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";



export function run(input: RunInput): FunctionRunResult {

  const ORDER_DISCOUNT: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.Maximum,
    discounts: [],
  };


  var totalAmount = 0
  input.cart.lines.map(e=>{
    totalAmount += 1 * e.cost.totalAmount.amount
  })

  if(totalAmount >= 1500){
    ORDER_DISCOUNT.discounts.push(	{
      value: {
        percentage: {
          value: 15,
        },
      },
      targets: [
        {
          orderSubtotal: {
            excludedVariantIds: [],
          },
        },
      ],
    })
  }else if(totalAmount >= 1000){
    ORDER_DISCOUNT.discounts.push(	{
      value: {
        percentage: {
          value: 10,
        },
      },
      targets: [
        {
          orderSubtotal: {
            excludedVariantIds: [],
          },
        },
      ],
    })
  }else if(totalAmount >= 500){
    ORDER_DISCOUNT.discounts.push(	{
      value: {
        percentage: {
          value: 5,
        },
      },
      targets: [
        {
          orderSubtotal: {
            excludedVariantIds: [],
          },
        },
      ],
    })
  }


  return ORDER_DISCOUNT;
};
