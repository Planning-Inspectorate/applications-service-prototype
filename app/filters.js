//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

addFilter('formatMonth', (number) => {
	var date = Date().month(number -1)
	return date.format('MMMM')
})

addFilter('daysAgo', (number) => {
	var date = Date().subtract(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInFuture', (number) => {
	var date = Date().add(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInFutureShort', (number) => {
	var date = Date().add(number,"days").format("D MMM YYYY")
	return date
})

addFilter('daysInPast', (number) => {
	var date = Date().subtract(number,"days").format("D MMMM YYYY")
	return date
})

addFilter('daysInPastShort', (number) => {
	var date = Date().subtract(number,"days").format("D MMM YYYY")
	return date
})

// some filters to return numeric dates
// one for each element, day, month, year (so, this splits out the daysAgo, monthsAgo and yearsAgo)
// they can be used for more specific date hints

addFilter('daysAgoDayNumeric', (number) => {
	var date = Date().subtract(number,"days").format("D")
	return date
})

addFilter('monthsAgoNumeric', (number) => {
	var date = Date().subtract(number,"days").format("M")
	return date
})

addFilter('monthsInFutureNumeric', (number) => {
	var date = Date().add(number,"months").format("M")
	return date
})

addFilter('yearsAgo', (number) => {
	var date = Date().subtract(number,"days").format("YYYY")
	return date
})

addFilter('push', (array, item) => {
	array.push(item)
	return array
})

addFilter('cleanArray', (array) => {
	return array.filter(item => {
		return (item && (item !==""))
	})
})
