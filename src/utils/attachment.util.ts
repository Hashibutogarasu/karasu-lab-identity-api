import { toDateString } from './date.util.js';
import type { AttachmentData } from '@hashibutogarasu/common';

/**
 * Maps Firestore attachment documents to AttachmentData objects.
 * Handles timestamp conversion to ISO 8601 strings.
 *
 * @param docs - Firestore QuerySnapshot of attachment documents
 * @returns Array of typed AttachmentData objects
 */
export const mapAttachments = (docs: FirebaseFirestore.QuerySnapshot): AttachmentData[] =>
  docs.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: toDateString(d.data()?.createdAt),
    updatedAt: toDateString(d.data()?.updatedAt),
  })) as AttachmentData[];
