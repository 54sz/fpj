import type {
  RunInput,
  FunctionRunResult,
  Target,
  ProductVariant
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";




export function run(input: RunInput): FunctionRunResult {

  const DISCOUNT_ITEMS: FunctionRunResult = {
    discountApplicationStrategy: DiscountApplicationStrategy.All,
    discounts: []
  }

  const targets2: Target[] = input.cart.lines.filter(line=>{
    if(line.merchandise.__typename === "ProductVariant"){
      return line.quantity >= 10 && line.quantity < 20;
    }
  }).map(line =>{
      return {
        productVariant: {
          id: (line.merchandise as ProductVariant).id
        }
      }
  });
  const targets4: Target[] = input.cart.lines.filter(line=>{
    if(line.merchandise.__typename === "ProductVariant"){
      return line.quantity >= 20 && line.quantity < 30;
    }
  }).map(line =>{
      return {
        productVariant: {
          id: (line.merchandise as ProductVariant).id
        }
      }
  });

  const targets6: Target[] = input.cart.lines.filter(line=>{
    if(line.merchandise.__typename === "ProductVariant"){
      return line.quantity >= 30;
    }
  }).map(line =>{
      return {
        productVariant: {
          id: (line.merchandise as ProductVariant).id
        }
      }
  });


  targets2.length > 0 &&  DISCOUNT_ITEMS.discounts.push({
    targets: targets2,
      value: {
        percentage: {
          value: 2
        }
      },
      message: "2% OFF, items over 10 and under 19"
  })

  targets4.length > 0 &&  DISCOUNT_ITEMS.discounts.push({
    targets: targets4,
      value: {
        percentage: {
          value: 4
        }
      },
      message: "4% OFF, items over 20 and under 29"
  })

  targets6.length > 0 &&  DISCOUNT_ITEMS.discounts.push({
    targets: targets6,
      value: {
        percentage: {
          value: 6
        }
      },
      message: "6% OFF, items over 30"
  })

  return DISCOUNT_ITEMS;
};
