import classifications from '../data/classifications.json';

export default function(classification) {
  return classifications[classification] || classification;  
}
