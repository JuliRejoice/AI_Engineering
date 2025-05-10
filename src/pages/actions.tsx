import { useEffect, useState, useCallback, memo } from 'react';
import { Job } from '@/types/job';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';

const Actions = memo(() => {
  return (
    <div className="space-y-6">
      ActionLists
    </div>
  );
});

export default Actions; 