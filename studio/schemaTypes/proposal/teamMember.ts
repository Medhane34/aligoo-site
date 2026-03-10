// sanity/schema/teamMember.ts
import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member (Dashboard Access)',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            description: 'Format: +251911223344 (with country code)',
            validation: Rule => Rule.required().regex(/^\+\d{10,15}$/, { name: 'phone' }),
        }),
        { name: 'email', title: 'Email (for magic links)', type: 'email', validation: Rule => Rule.required() }, // ← ADD THIS
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: {
                list: [
                    { title: 'Admin', value: 'admin' },
                    { title: 'Sales', value: 'sales' },
                    { title: 'Manager', value: 'manager' },
                ],
            },
        }),
        defineField({
            name: 'image',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'phone',
        },
    },
})