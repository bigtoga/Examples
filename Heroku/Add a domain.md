1. Verify your account by adding a credit card
2. heroku domains:add www.refinance.win --app fanniesaves
3. heroku domains:wait 'www.refinance.win' --app fanniesaves
4. heroku domains --app fanniesaves | clip

You will be given the CNAME for DNS

Go to your DNS servers:
1. Set up a CNAME for www to point to the `herokudns.com` listing from `heroku domains`

To remove:
`heroky domains:remove www.refinance.win --app fanniesaves`
