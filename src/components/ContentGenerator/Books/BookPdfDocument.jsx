import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 30 },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  heading: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10 }, // New style for headings
});

const BookPdfDocument = ({ bookData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>Title: {bookData.title}</Text>
        <Text>Type: {bookData.book_type}</Text>
        <Text>Description: {bookData.description}</Text>
        <Text>Content: {bookData.content}</Text>
      </View>
      {/* Render chapters and sections */}
      {bookData.chapters?.map((chapter, index) => (
        <View key={index} style={styles.section}>
          {/* Apply the heading style to chapter titles */}
          <Text style={styles.heading}>Chapter {index + 1}: {chapter.name}</Text>
          {chapter.sections?.map((section, sIndex) => (
            <Text key={sIndex}>Section {sIndex + 1}: {section.content}</Text>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default BookPdfDocument;
