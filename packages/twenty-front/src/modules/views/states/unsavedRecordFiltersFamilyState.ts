import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';
import { type UnsavedRecordFilters } from '@/views/types/UnsavedRecordFilters';
import { createJSONStorage } from 'jotai/utils';

const sessionJsonStorage = createJSONStorage<UnsavedRecordFilters | null>(
  () => sessionStorage,
);

export const unsavedRecordFiltersFamilyState = createAtomFamilyState<
  UnsavedRecordFilters | null,
  { viewId: string }
>({
  key: 'unsavedRecordFiltersFamilyState',
  defaultValue: null,
  storage: {
    getItem: sessionJsonStorage.getItem,
    setItem: sessionJsonStorage.setItem,
    removeItem: sessionJsonStorage.removeItem,
  },
});
