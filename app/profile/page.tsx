import { ChangePasswordForm } from './change-password-form'
import { ProfileForm } from './profile-form'

export default function ProfilePage() {
  return (
    <>
      <title>Profile page</title>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex gap-3">
          <ProfileForm />
          <ChangePasswordForm />
        </div>
      </section>
    </>
  )
}
