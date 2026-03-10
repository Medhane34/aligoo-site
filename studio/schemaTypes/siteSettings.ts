import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'general', title: 'General & SEO', default: true },
        { name: 'localBusiness', title: 'Local Business Info' },
        { name: 'reviews', title: 'Aggregate Rating' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            group: 'general',
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
            group: 'general',
        }),

        // LocalBusiness Fields
        defineField({
            name: 'telephone',
            title: 'Telephone',
            type: 'string',
            group: 'localBusiness',
        }),
        defineField({
            name: 'streetAddress',
            title: 'Street Address',
            type: 'string',
            group: 'localBusiness',
        }),
        defineField({
            name: 'addressLocality',
            title: 'City / Locality',
            type: 'string',
            group: 'localBusiness',
            initialValue: 'Addis Ababa',
        }),
        defineField({
            name: 'addressRegion',
            title: 'Region / State',
            type: 'string',
            group: 'localBusiness',
            initialValue: 'Addis Ababa',
        }),
        defineField({
            name: 'postalCode',
            title: 'Postal Code',
            type: 'string',
            group: 'localBusiness',
        }),
        defineField({
            name: 'addressCountry',
            title: 'Country',
            type: 'string',
            group: 'localBusiness',
            initialValue: 'ET',
        }),
        defineField({
            name: 'latitude',
            title: 'Latitude',
            type: 'string',
            group: 'localBusiness',
        }),
        defineField({
            name: 'longitude',
            title: 'Longitude',
            type: 'string',
            group: 'localBusiness',
        }),

        // AggregateRating Fields
        defineField({
            name: 'ratingValue',
            title: 'Aggregate Rating Value (e.g. 4.9)',
            type: 'number',
            group: 'reviews',
        }),
        defineField({
            name: 'reviewCount',
            title: 'Total Review Count',
            type: 'number',
            group: 'reviews',
        }),
    ],
})
