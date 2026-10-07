import { RecordFiltersComponentInstanceContext } from '@/object-record/record-filter/states/context/RecordFiltersComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';

export const loadedRecordFiltersViewIdComponentState = createAtomComponentState<
  string | null
>({
  key: 'loadedRecordFiltersViewIdComponentState',
  defaultValue: null,
  componentInstanceContext: RecordFiltersComponentInstanceContext,
});
