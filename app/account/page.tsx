import AccountForm from './account-form';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = await createClient();
  // console.log('supabase', supabase);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
