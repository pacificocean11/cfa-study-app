import getDb from './database.js';

const db = await getDb();

const topics = [
  { name: 'Ethical & Professional Standards', description: 'Code of ethics, standards of professional conduct, and GIPS', color: '#1abc9c' },
  { name: 'Quantitative Methods', description: 'Time value of money, probability, statistics, and regression', color: '#3498db' },
  { name: 'Economics', description: 'Microeconomics, macroeconomics, and currency exchange rates', color: '#9b59b6' },
  { name: 'Financial Statement Analysis', description: 'Financial reporting, ratios, and cash flow analysis', color: '#e67e22' },
  { name: 'Corporate Issuers', description: 'Corporate governance, capital structure, and M&A', color: '#e74c3c' },
  { name: 'Equity Investments', description: 'Equity valuation, market efficiency, and analysis', color: '#2ecc71' },
  { name: 'Fixed Income', description: 'Bond valuation, yield measures, and credit analysis', color: '#f39c12' },
  { name: 'Derivatives', description: 'Forwards, futures, swaps, and options', color: '#16a085' },
  { name: 'Alternative Investments', description: 'Hedge funds, private equity, real estate, and commodities', color: '#d35400' },
  { name: 'Portfolio Management', description: 'Asset allocation, risk management, and wealth planning', color: '#2c3e50' },
];

const flashcards = [
  { topic_id: 1, question: 'What are the six components of the CFA Institute Code of Ethics?', answer: 'Act with integrity, place client interests first, use reasonable care, maintain professional competence, disclose conflicts, maintain confidentiality', difficulty: 'medium' },
  { topic_id: 1, question: 'What is the "duty of loyalty" under Standard III(A)?', answer: 'Clients\' interests must come before employer\'s or personal interests. Investment actions must be in the best interest of clients.', difficulty: 'easy' },
  { topic_id: 1, question: 'What does Standard V(A) - Diligence and Reasonable Basis require?', answer: 'Members must have a reasonable and adequate basis for investment actions, supported by appropriate research and investigation.', difficulty: 'medium' },
  { topic_id: 1, question: 'What is "material nonpublic information" under Standard II(A)?', answer: 'Information that would likely affect an investment\'s value if disclosed, and has not been publicly disseminated.', difficulty: 'hard' },
  { topic_id: 1, question: 'What are the responsibilities of supervisors under Standard IV(C)?', answer: 'Supervisors must make reasonable efforts to detect and prevent violations of laws and the Code of Ethics.', difficulty: 'medium' },
  { topic_id: 2, question: 'What is the formula for the future value of a single cash flow?', answer: 'FV = PV × (1 + r)^n where r is the interest rate per period and n is number of periods', difficulty: 'easy' },
  { topic_id: 2, question: 'What is the difference between a Type I and Type II error?', answer: 'Type I: rejecting a true null hypothesis (false positive). Type II: failing to reject a false null hypothesis (false negative).', difficulty: 'medium' },
  { topic_id: 2, question: 'What is the formula for the present value of a perpetuity?', answer: 'PV = PMT / r where PMT is the constant payment and r is the discount rate', difficulty: 'easy' },
  { topic_id: 2, question: 'What does R-squared measure in regression analysis?', answer: 'The proportion of the total variation in the dependent variable explained by the independent variable(s). Ranges from 0 to 1.', difficulty: 'medium' },
  { topic_id: 2, question: 'What is a Bernoulli random variable?', answer: 'A random variable with exactly two possible outcomes: success (1) with probability p, failure (0) with probability (1-p).', difficulty: 'hard' },
  { topic_id: 3, question: 'What is the law of demand?', answer: 'As price increases, quantity demanded decreases, all else being equal (ceteris paribus).', difficulty: 'easy' },
  { topic_id: 3, question: 'What are the four phases of the business cycle?', answer: 'Expansion (recovery), peak, contraction (recession), trough', difficulty: 'easy' },
  { topic_id: 3, question: "What is purchasing power parity (PPP)?", answer: "The theory that exchange rates adjust so that identical goods cost the same in different countries when priced in a common currency.", difficulty: 'medium' },
  { topic_id: 3, question: 'What is the difference between absolute and comparative advantage?', answer: 'Absolute advantage: ability to produce more of a good with same resources. Comparative advantage: lower opportunity cost of production.', difficulty: 'hard' },
  { topic_id: 3, question: 'What is the Fisher effect?', answer: 'Nominal interest rate = Real interest rate + Expected inflation rate. Higher expected inflation leads to higher nominal rates.', difficulty: 'medium' },
  { topic_id: 4, question: 'What are the three main financial statements?', answer: 'Balance sheet (financial position), income statement (performance), cash flow statement (liquidity and solvency).', difficulty: 'easy' },
  { topic_id: 4, question: 'What is the formula for the current ratio?', answer: 'Current Ratio = Current Assets / Current Liabilities', difficulty: 'easy' },
  { topic_id: 4, question: "What is the difference between FIFO and LIFO inventory methods?", answer: "FIFO: oldest costs assigned to COGS. LIFO: newest costs assigned to COGS. In rising prices, FIFO gives higher net income.", difficulty: 'medium' },
  { topic_id: 4, question: 'What is the DuPont decomposition of ROE?', answer: 'ROE = Net Profit Margin × Asset Turnover × Financial Leverage = (NI/Sales) × (Sales/Assets) × (Assets/Equity)', difficulty: 'hard' },
  { topic_id: 4, question: 'What is the difference between operating and finance leases under IFRS?', answer: 'Under IFRS 16, all leases are treated as finance leases (right-of-use asset and lease liability). US GAAP still distinguishes them.', difficulty: 'hard' },
  { topic_id: 5, question: 'What are the primary sources of capital for corporations?', answer: 'Debt (bonds, loans) and equity (common stock, preferred stock, retained earnings).', difficulty: 'easy' },
  { topic_id: 5, question: 'What is the weighted average cost of capital (WACC)?', answer: 'WACC = wd × rd(1-t) + we × re, where w = weights, rd = cost of debt, re = cost of equity, t = tax rate.', difficulty: 'medium' },
  { topic_id: 5, question: 'What is Modigliani-Miller Proposition I (without taxes)?', answer: "In perfect markets, a firm's value is independent of its capital structure. VL = VU.", difficulty: 'hard' },
  { topic_id: 5, question: 'What is an IPO and why do companies go public?', answer: 'Initial Public Offering - first sale of stock to the public. Reasons: access to capital, liquidity for shareholders, acquisition currency.', difficulty: 'easy' },
  { topic_id: 6, question: 'What is the dividend discount model (DDM)?', answer: 'V0 = D1 / (r - g), where D1 = next dividend, r = required return, g = growth rate (Gordon Growth Model).', difficulty: 'medium' },
  { topic_id: 6, question: 'What is the difference between a price-weighted and market-cap-weighted index?', answer: 'Price-weighted: stocks weighted by price (higher price = more influence). Cap-weighted: stocks weighted by market cap (larger company = more influence).', difficulty: 'medium' },
  { topic_id: 6, question: 'What are the three forms of market efficiency?', answer: 'Weak-form (past prices reflected), semi-strong form (all public info reflected), strong-form (all info including private reflected).', difficulty: 'medium' },
  { topic_id: 6, question: 'What is the CAPM formula?', answer: 'E(Ri) = Rf + βi × [E(Rm) - Rf], where expected return = risk-free rate + beta × market risk premium.', difficulty: 'easy' },
  { topic_id: 7, question: 'What is the relationship between bond prices and yields?', answer: 'Inverse relationship: when yields rise, bond prices fall, and vice versa (convex).', difficulty: 'easy' },
  { topic_id: 7, question: 'What is duration?', answer: 'A measure of a bond\'s sensitivity to changes in interest rates. Approximate % change in price for a 1% change in yield.', difficulty: 'medium' },
  { topic_id: 7, question: 'What is a yield curve and what are the main shapes?', answer: 'Graph of yields vs. maturities. Normal (upward sloping), flat, inverted (downward sloping, recession signal).', difficulty: 'easy' },
  { topic_id: 7, question: 'What is the difference between investment-grade and high-yield bonds?', answer: 'Investment-grade: rated BBB-/Baa3 or above. High-yield (junk): below investment grade, higher risk, higher yield.', difficulty: 'easy' },
  { topic_id: 8, question: 'What is a forward contract?', answer: 'An OTC agreement to buy/sell an asset at a future date at a predetermined price. Customizable but has counterparty risk.', difficulty: 'easy' },
  { topic_id: 8, question: 'What is the difference between a call option and a put option?', answer: 'Call: right to BUY at strike price. Put: right to SELL at strike price. Both have limited downside (premium paid).', difficulty: 'easy' },
  { topic_id: 8, question: 'What is put-call parity?', answer: 'C + PV(X) = P + S, where C = call price, P = put price, X = strike, S = spot price. Relationship between put and call prices.', difficulty: 'hard' },
  { topic_id: 8, question: 'What is the difference between futures and forwards?', answer: 'Futures: exchange-traded, standardized, marked-to-market daily, lower counterparty risk. Forwards: OTC, customizable.', difficulty: 'medium' },
  { topic_id: 9, question: 'What are the main categories of alternative investments?', answer: 'Hedge funds, private equity, real estate, commodities, infrastructure, and collectibles.', difficulty: 'easy' },
  { topic_id: 9, question: 'What is a hedge fund\'s "2 and 20" fee structure?', answer: '2% management fee on assets and 20% performance fee on profits (above a high-water mark).', difficulty: 'medium' },
  { topic_id: 9, question: 'What is the difference between a leveraged buyout (LBO) and venture capital?', answer: 'LBO: acquiring mature companies using significant debt. VC: investing in early-stage/high-growth companies.', difficulty: 'medium' },
  { topic_id: 10, question: 'What is the efficient frontier?', answer: 'The set of portfolios that offers the highest expected return for a given level of risk (or lowest risk for a given return).', difficulty: 'medium' },
  { topic_id: 10, question: 'What is the Sharpe ratio?', answer: 'Sharpe Ratio = (Rp - Rf) / σp, where Rp = portfolio return, Rf = risk-free rate, σp = portfolio standard deviation.', difficulty: 'easy' },
  { topic_id: 10, question: 'What is the difference between asset allocation and security selection?', answer: 'Asset allocation: how to distribute investments across asset classes. Security selection: choosing specific securities within an asset class.', difficulty: 'easy' },
  { topic_id: 10, question: 'What is Monte Carlo simulation used for in portfolio management?', answer: 'To model the probability distribution of portfolio outcomes by simulating thousands of possible scenarios based on random variable inputs.', difficulty: 'hard' },
];

const questions = [
  { topic_id: 1, question: 'Under the CFA Institute Code of Ethics, which of the following is NOT a fundamental principle?', options: ['Act with integrity', 'Place employer interests first', 'Use reasonable care', 'Maintain professional competence'], correct_index: 1, explanation: 'The Code requires placing CLIENT interests first, not employer interests.', difficulty: 'easy' },
  { topic_id: 1, question: 'A portfolio manager learns that a client is about to be acquired by another company before the information is public. What should the manager do?', options: ['Trade on the information', 'Disclose it to other clients', 'Maintain confidentiality and not trade', 'Inform their supervisor'], correct_index: 2, explanation: 'Standard II(A) prohibits trading on material nonpublic information.', difficulty: 'medium' },
  { topic_id: 1, question: 'Which Standard requires fair treatment of all clients?', options: ['Standard I(A)', 'Standard III(B)', 'Standard IV(A)', 'Standard V(B)'], correct_index: 1, explanation: 'Standard III(B) - Fair Dealing requires members to deal fairly and objectively with all clients.', difficulty: 'medium' },
  { topic_id: 2, question: 'If you invest $1,000 at 8% annual interest compounded annually for 5 years, what is the future value?', options: ['$1,400.00', '$1,469.33', '$1,489.85', '$1,500.00'], correct_index: 1, explanation: 'FV = 1000 × (1.08)^5 = $1,469.33', difficulty: 'easy' },
  { topic_id: 2, question: 'What does a p-value of 0.03 indicate at a 5% significance level?', options: ['Fail to reject the null hypothesis', 'Reject the null hypothesis', 'Accept the null hypothesis', 'The test is inconclusive'], correct_index: 1, explanation: 'Since 0.03 < 0.05, we reject the null hypothesis. The result is statistically significant.', difficulty: 'medium' },
  { topic_id: 2, question: 'What is the probability of rolling a sum of 7 with two fair dice?', options: ['1/6', '1/9', '1/12', '1/36'], correct_index: 0, explanation: 'There are 6 combinations that sum to 7 out of 36 total. 6/36 = 1/6.', difficulty: 'easy' },
  { topic_id: 3, question: 'Which of the following would cause a rightward shift in the aggregate demand curve?', options: ['An increase in taxes', 'A decrease in government spending', 'An increase in consumer confidence', 'An increase in interest rates'], correct_index: 2, explanation: 'Higher consumer confidence increases consumption, shifting AD right.', difficulty: 'medium' },
  { topic_id: 3, question: "If the domestic currency depreciates, what happens to exports and imports?", options: ['Exports increase, imports decrease', 'Exports decrease, imports increase', 'Both exports and imports increase', 'Both exports and imports decrease'], correct_index: 0, explanation: 'Depreciation makes exports cheaper (more competitive) and imports more expensive.', difficulty: 'easy' },
  { topic_id: 3, question: 'In the short run, an expansionary monetary policy will most likely:', options: ['Decrease inflation and increase unemployment', 'Increase inflation and decrease unemployment', 'Decrease both inflation and unemployment', 'Increase both inflation and unemployment'], correct_index: 1, explanation: 'Expansionary policy lowers rates, stimulates spending, reducing unemployment but raising inflation (Phillips curve trade-off).', difficulty: 'medium' },
  { topic_id: 4, question: 'A company has current assets of $500,000 and current liabilities of $200,000. What is its current ratio?', options: ['0.4', '2.5', '1.5', '3.0'], correct_index: 1, explanation: 'Current Ratio = 500,000 / 200,000 = 2.5', difficulty: 'easy' },
  { topic_id: 4, question: 'Under IFRS, which of the following is an acceptable inventory costing method?', options: ['LIFO', 'FIFO', 'Both LIFO and FIFO', 'Neither LIFO nor FIFO'], correct_index: 1, explanation: 'IFRS prohibits LIFO but allows FIFO and weighted average cost.', difficulty: 'hard' },
  { topic_id: 4, question: 'An increase in which ratio would most likely indicate a deterioration of liquidity?', options: ['Current ratio', 'Quick ratio', 'Debt-to-equity ratio', 'Times interest earned'], correct_index: 2, explanation: 'Higher debt-to-equity means more leverage and higher financial risk, which can indicate liquidity deterioration.', difficulty: 'medium' },
  { topic_id: 5, question: 'If a company has a debt-to-equity ratio of 1.5, what proportion of its capital is debt?', options: ['40%', '50%', '60%', '75%'], correct_index: 2, explanation: 'D/E = 1.5 means D = 1.5E, so total = 2.5E. Debt proportion = 1.5/2.5 = 60%.', difficulty: 'medium' },
  { topic_id: 5, question: 'What is the primary goal of financial management?', options: ['Maximize profits', 'Maximize shareholder wealth', 'Minimize costs', 'Maximize market share'], correct_index: 1, explanation: 'The primary goal is maximizing shareholder wealth (share price), not just profits.', difficulty: 'easy' },
  { topic_id: 5, question: 'Which of the following is most likely a benefit of having debt in the capital structure?', options: ['No legal obligation to pay', 'Tax deductibility of interest', 'Lower financial risk', 'No impact on earnings volatility'], correct_index: 1, explanation: 'Interest payments are tax-deductible, providing a tax shield that reduces the effective cost of debt.', difficulty: 'medium' },
  { topic_id: 6, question: 'A stock with a beta of 1.5 is expected to have a return that is:', options: ['Less volatile than the market', 'Equally volatile as the market', '1.5 times as volatile as the market', 'Uncorrelated with the market'], correct_index: 2, explanation: 'Beta measures systematic risk. β = 1.5 means 50% more volatile than the market.', difficulty: 'easy' },
  { topic_id: 6, question: 'According to the Gordon Growth Model, if a stock pays a $2 dividend, has a 10% required return, and 5% growth rate, its value is:', options: ['$20', '$30', '$40', '$50'], correct_index: 2, explanation: 'V0 = D1/(r-g) = 2/(0.10-0.05) = $40', difficulty: 'medium' },
  { topic_id: 6, question: 'Which market efficiency form says stock prices reflect all public information?', options: ['Weak-form', 'Semi-strong form', 'Strong-form', 'All three forms'], correct_index: 1, explanation: 'Semi-strong form efficiency states that all publicly available information is reflected in stock prices.', difficulty: 'easy' },
  { topic_id: 7, question: 'If interest rates increase by 1% and a bond has a duration of 5, the bond price will approximately:', options: ['Increase by 5%', 'Decrease by 5%', 'Increase by 1%', 'Decrease by 1%'], correct_index: 1, explanation: 'Approximate price change ≈ -Duration × Δy = -5 × 1% = -5%.', difficulty: 'medium' },
  { topic_id: 7, question: 'Which of the following bonds has the highest price sensitivity to interest rate changes?', options: ['Short-term, high coupon', 'Short-term, low coupon', 'Long-term, high coupon', 'Long-term, low coupon'], correct_index: 3, explanation: 'Longer maturity and lower coupon both increase duration, which increases price sensitivity.', difficulty: 'hard' },
  { topic_id: 7, question: 'What is a zero-coupon bond?', options: ['A bond with no face value', 'A bond that pays no periodic interest', 'A bond with variable coupon payments', 'A bond with zero default risk'], correct_index: 1, explanation: 'Zero-coupon bonds are sold at a discount and pay no periodic interest. The return is the difference between purchase price and face value at maturity.', difficulty: 'easy' },
  { topic_id: 8, question: 'A call option is "in the money" when:', options: ['Strike price > spot price', 'Strike price < spot price', 'Strike price = spot price', 'The option has no time value'], correct_index: 1, explanation: 'A call is ITM when spot > strike (can buy below market price).', difficulty: 'easy' },
  { topic_id: 8, question: 'What is the maximum loss for a buyer of a put option?', options: ['Unlimited', 'The strike price', 'The premium paid', 'The spot price minus premium'], correct_index: 2, explanation: 'The maximum loss for any option buyer is the premium paid.', difficulty: 'medium' },
  { topic_id: 8, question: 'Which derivative contract is marked to market daily?', options: ['Forward contract', 'Futures contract', 'Swap contract', 'All of the above'], correct_index: 1, explanation: 'Futures contracts are exchange-traded and marked to market daily, requiring margin adjustments.', difficulty: 'medium' },
  { topic_id: 9, question: 'Which of the following is most likely a characteristic of hedge funds?', options: ['High regulation', 'Transparent reporting', 'Use of leverage and derivatives', 'Long-only positions'], correct_index: 2, explanation: 'Hedge funds typically use leverage, derivatives, and short selling, with less regulation than mutual funds.', difficulty: 'medium' },
  { topic_id: 9, question: 'Private equity real estate investing typically focuses on:', options: ['Residential mortgages', 'Direct ownership of commercial properties', 'REIT shares', 'Real estate ETFs'], correct_index: 1, explanation: 'Private equity real estate involves direct ownership and management of commercial properties.', difficulty: 'medium' },
  { topic_id: 10, question: 'A portfolio with a Sharpe ratio of 1.5 compared to one with 0.8 indicates:', options: ['Lower risk-adjusted returns', 'Higher risk-adjusted returns', 'Higher total returns', 'Lower total returns'], correct_index: 1, explanation: 'Higher Sharpe ratio means better risk-adjusted return (more return per unit of risk).', difficulty: 'easy' },
  { topic_id: 10, question: 'What is the primary benefit of diversification?', options: ['Increases expected returns', 'Reduces unsystematic risk', 'Eliminates all risk', 'Reduces systematic risk'], correct_index: 1, explanation: 'Diversification reduces unsystematic (firm-specific) risk but cannot eliminate systematic (market) risk.', difficulty: 'medium' },
  { topic_id: 10, question: 'The risk-free rate is 3%, the market return is 10%, and a stock has a beta of 1.2. Using CAPM, the expected return is:', options: ['10.4%', '11.4%', '12.4%', '13.4%'], correct_index: 1, explanation: 'E(R) = 3% + 1.2 × (10% - 3%) = 3% + 8.4% = 11.4%', difficulty: 'medium' },
];

db.run('DELETE FROM quiz_attempts');
db.run('DELETE FROM flashcard_reviews');
db.run('DELETE FROM study_sessions');
db.run('DELETE FROM questions');
db.run('DELETE FROM flashcards');
db.run('DELETE FROM topics');

const insertTopic = db.prepare('INSERT INTO topics (name, description, color) VALUES (?, ?, ?)');
const topicIds = [];
for (const t of topics) {
  insertTopic.run(t.name, t.description, t.color);
  const row = db.prepare('SELECT last_insert_rowid() as id').get();
  topicIds.push(row.id);
}

const insertFlashcard = db.prepare('INSERT INTO flashcards (topic_id, question, answer, difficulty) VALUES (?, ?, ?, ?)');
for (const f of flashcards) {
  insertFlashcard.run(f.topic_id, f.question, f.answer, f.difficulty);
}

const insertQuestion = db.prepare('INSERT INTO questions (topic_id, question, options, correct_index, explanation, difficulty) VALUES (?, ?, ?, ?, ?, ?)');
for (const q of questions) {
  insertQuestion.run(q.topic_id, q.question, JSON.stringify(q.options), q.correct_index, q.explanation, q.difficulty);
}

db.save();

console.log('Database seeded successfully!');
console.log(`  ${topics.length} topics`);
console.log(`  ${flashcards.length} flashcards`);
console.log(`  ${questions.length} practice questions`);
