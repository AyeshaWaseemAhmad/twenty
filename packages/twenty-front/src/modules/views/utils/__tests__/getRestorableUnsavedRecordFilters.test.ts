import { type FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { type UnsavedRecordFilters } from '@/views/types/UnsavedRecordFilters';
import { getRestorableUnsavedRecordFilters } from '@/views/utils/getRestorableUnsavedRecordFilters';
import {
  RecordFilterGroupLogicalOperator,
  ViewFilterOperand,
} from 'twenty-shared/types';

describe('getRestorableUnsavedRecordFilters', () => {
  const fieldMetadataItems = [
    { id: 'field-1' },
    { id: 'field-2' },
  ] as FieldMetadataItem[];

  const unsavedRecordFilters: UnsavedRecordFilters = {
    recordFilters: [
      {
        id: 'filter-1',
        fieldMetadataId: 'field-1',
        value: 'acme',
        displayValue: 'acme',
        type: 'TEXT',
        operand: ViewFilterOperand.CONTAINS,
        label: 'Name',
      },
    ],
    recordFilterGroups: [
      {
        id: 'group-1',
        logicalOperator: RecordFilterGroupLogicalOperator.AND,
      },
    ],
  };

  it('should return null when nothing was stored', () => {
    expect(
      getRestorableUnsavedRecordFilters({
        unsavedRecordFilters: null,
        fieldMetadataItems,
      }),
    ).toBeNull();
  });

  it('should return the stored filters when every field still exists', () => {
    expect(
      getRestorableUnsavedRecordFilters({
        unsavedRecordFilters,
        fieldMetadataItems,
      }),
    ).toEqual(unsavedRecordFilters);
  });

  it('should return null when a filtered field no longer exists', () => {
    expect(
      getRestorableUnsavedRecordFilters({
        unsavedRecordFilters,
        fieldMetadataItems: [{ id: 'field-2' }] as FieldMetadataItem[],
      }),
    ).toBeNull();
  });

  it('should return null when a relation target field no longer exists', () => {
    expect(
      getRestorableUnsavedRecordFilters({
        unsavedRecordFilters: {
          ...unsavedRecordFilters,
          recordFilters: [
            {
              ...unsavedRecordFilters.recordFilters[0],
              relationTargetFieldMetadataId: 'field-3',
            },
          ],
        },
        fieldMetadataItems,
      }),
    ).toBeNull();
  });

  it('should return null when the stored value is malformed', () => {
    expect(
      getRestorableUnsavedRecordFilters({
        unsavedRecordFilters: {
          recordFilters: 'oops',
        } as unknown as UnsavedRecordFilters,
        fieldMetadataItems,
      }),
    ).toBeNull();
  });
});
