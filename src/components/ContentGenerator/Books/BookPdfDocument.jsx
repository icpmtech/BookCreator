import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 30 },
  section: {fontSize: 14, margin: 10, padding: 10, flexGrow: 1 },
  heading: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 10 }, 
  text: { fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 10 }, // New style for headings
});

const BookPdfDocument = ({ bookData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text tyle={styles.heading}  >{bookData.title}</Text>
        <Text>{bookData.description}</Text>
        <Text>{bookData.content}</Text>
      </View>
      </Page>
      {/* Render chapters and sections */}
      {bookData.chapters?.map((chapter, index) => (
        <Page style={styles.page}>
        <View key={index} style={styles.section}>
          {/* Apply the heading style to chapter titles */}
          <Text style={styles.heading}>Chapter {index + 1}: {chapter.title}</Text>
          {chapter.sections?.map((section, sIndex) => (
            
            <Text  style={styles.text} key={sIndex}>Section {sIndex + 1}: {section.content}</Text>
          ))}
        </View>
        </Page>
      ))}
    
  </Document>
);

export default BookPdfDocument;
