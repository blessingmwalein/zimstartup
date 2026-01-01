export interface WalletResponse {
    post_details: PostDetails;
}

export interface PostDetails {
    id:          number;
    created_at:  Date;
    status:      string;
    updated_at:  Date;
    national_id: string;
    currency:    string;
    cash:        number;
}

//exhcnage cash request model nationalId: string,
    // targetInvestorId: string,
    // amount: number,
export interface ExchangeCashRequest {
    national_id: string;
    target_investor_id: string;
    amount: number;
}

//sell stock request model
export interface SellStockRequest {
    national_id: string;
    stock_id: number;
    quantity: number;
}

//buy stock request model
export interface BuyStockRequest {
    national_id: string;
    stock_id: number;
    quantity: number;
}


//update stock price request model
export interface UpdateStockPriceRequest {
    stock_id: number;
    new_price: number;
    national_id: string;
}

