import { redirect } from "@/i18n/navigation";

export default async function HomePage() {
  redirect({href: '/dashboard', locale: 'en'});
}