<template>
  <NuxtLayout>
    <div class="bg-transparent-all">
      <TableVue title="Users Management" :data="people" :columns="columns" :filters="filter" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import TableVue from "~/components/TableVue.vue";

const filter = {
  search: [
    {
      name: "name"
    },
    {
      name: "title"
    },
    {
      name: "email"
    },
    {
      name: "role"
    }
  ],
  date:[
    {
      name: "created_at"
    },
    {
      name: "updated_at"
    }
  ]
}

const actionCssClass =
  "bg-transparent-all border-2 px-3 py-1 border-white rounded-full uppercase cursor-pointer hover:border-10 hover:border-purple-300 hover:transition hover:ease-in-out focus:border-purple-600 hover:text-purple-300";

const action = `<div class="flex bg-transparent-all justify-evenly">
                <span class="${actionCssClass}">edit</span>
                <span class="${actionCssClass}">delete</span>
                <span class="${actionCssClass}">approve</span>
                <span class="${actionCssClass}">reject</span>
                <span class="${actionCssClass}">cancelled</span>
              </div>`;

const people = [
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Back-end Developer",
    email: "lindsay.walton@gmail.com",
    role: "Admin",
    action: action,
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    action: action,
    salary: "5000",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
    action: action,
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 7,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 8,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 9,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 10,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 11,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
    action: action,
  },
  {
    id: 12,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
    action: action,
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 7,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 8,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 9,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 10,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 11,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
    action: action,
  },
  {
    id: 12,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
    action: action,
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 7,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 8,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 9,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
    action: action,
  },
  {
    id: 10,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
    action: action,
  },
  {
    id: 11,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
    action: action,
  },
  {
    id: 12,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
    action: action,
  },
];

const columns = [
  /* {
        "name": "id",
        "align": "center",
    }, */
  {
    name: "name",
    align: "left",
    sort: true
  },
  {
    name: "title",
    align: "right",
  },
  {
    name: "email",
    align: "center",
  },
  {
    name: "role",
    align: "center",
    sort: true
  },
  {
    name: "action",
    align: "center",
  },
];
</script>
