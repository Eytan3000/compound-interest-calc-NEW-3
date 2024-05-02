import { Container, Typography } from '@mui/joy';

export default function HpArticle() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 10 }}>
      <Typography level="h3">What is compound interest?</Typography>
      <Typography level="body-lg">
        Compound interest is a powerful concept in finance that can help your
        money grow over time. It's like magic for your savings! Here's a simple
        explanation:
        <br />
        <br />
        Imagine you have $100 in a savings account that pays you 5% interest per
        year. With simple interest, you'd earn $5 every year ($100 x 5%). But
        with compound interest, it gets even better.
        <br />
        <br />
        In the first year, you earn the same $5. Now, here's where it gets
        interesting. In the second year, you not only earn 5% on your initial
        $100 ($5) but also on the interest you earned in the first year ($5).
        So, you earn 5% of $100 + 5% of $5, totaling $5.25.
        <br />
        <br />
        This process continues, with each year's interest adding to your
        principal (the original $100). Over time, your money grows faster and
        faster. This compounding effect means your $100 can turn into a much
        larger sum down the road. It's like a snowball rolling down a hill,
        getting bigger as it goes.
        <br />
        <br />
        Compound interest helps you save and invest wisely, allowing your money
        to work for you and potentially build wealth over time. So, start early,
        and let time and compounding do the heavy lifting for your financial
        goals.
      </Typography>

      <Typography sx={{ marginTop: 10 }} level="h3">
        How to estimate interest rate
      </Typography>
      <Typography level="body-lg">
        Estimating an interest rate depends on the context and what you're
        trying to calculate. Here are a few common scenarios and methods for
        estimating interest rates:
        <br />
        <br />
        1. <b>Savings Account or Investment Returns:</b> If you want to estimate
        the interest rate you'll earn on a savings account or an investment, you
        can usually find the annual percentage yield (APY) or the expected rate
        of return provided by the financial institution or investment product.
        Be sure to read the terms and conditions carefully, as these rates can
        vary widely.
        <br />
        <br />
        2. <b>Loan Interest Rate:</b> To estimate the interest rate on a loan,
        such as a mortgage or car loan, you can use an online loan calculator.
        Input the loan amount, term, and any other relevant details, and it will
        calculate the approximate interest rate based on your inputs.
        <br />
        <br />
        3. <b>Bond Yields:</b> For estimating the interest rate on bonds, you
        can look up the current yield or yield to maturity (YTM) for the
        specific bond you're interested in. Bond prices and yields are inversely
        related, so as the price of a bond goes up, its yield goes down, and
        vice versa.
        <br />
        <br />
        4. <b>Market Interest Rates:</b> The general level of interest rates in
        the financial markets, such as the prime rate or the yield on U.S.
        Treasury bonds, can be indicative of the prevailing interest rate
        environment. These rates can serve as a benchmark for estimating other
        interest rates.
        <br />
        <br />
        5. <b>Credit Score and Risk Assessment:</b> When applying for a loan or
        credit card, your creditworthiness plays a significant role in
        determining the interest rate you'll be offered. You can estimate your
        rate based on your credit score and financial history. Many financial
        institutions provide tools to get a rough estimate.
        <br />
        <br />
        6. <b>Peer Comparison:</b> If you're unsure about a specific interest
        rate, compare it to similar financial products offered by different
        institutions. This can help you gauge whether the rate you're
        considering is competitive.
        <br />
        <br />
        Remember that these methods provide estimates, and the actual interest
        rate you receive may vary based on individual circumstances, market
        conditions, and negotiations with lenders or financial institutions.
        Always read the fine print and consult with a financial advisor if you
        have any doubts or specific financial needs.
      </Typography>
    </Container>
  );
}
