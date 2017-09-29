// describe('Auction Sniper', () => {
//   const auction = new FakeAuctionServer('item-54321')
//   const application = new ApplicationRunner

//   it('can join auction until auction closes', () => {
//     auction.startSellingItem()
//     application.startBiddingIn(auction)
//     auction.hasReceivedJoinRequestFromSniper()
//     auction.announceClosed()
//     application.showSniperHasLostAuction()
//   })

//   afterAll(() => {
//     auction.stop()
//     application.stop()
//   })
// })