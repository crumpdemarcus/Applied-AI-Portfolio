import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Colors
const c = {
  primary: '#4ECDC4',
  coral: '#FF6B6B',
  purple: '#9B5DE5',
  pink: '#FF1493',
  yellow: '#F7DC6F',
  blue: '#00D4FF',
  bg: '#0a0a1a',
  card: '#1a1a3e',
  cardLight: '#252560',
  text: '#ffffff',
  muted: '#a0a0c0',
};

const s = StyleSheet.create({
  // Pages
  page: { backgroundColor: c.bg, padding: 50, color: c.text },
  coverPage: { backgroundColor: c.bg, padding: 50, color: c.text, justifyContent: 'center', alignItems: 'center' },
  
  // Cover
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 56, fontWeight: 'bold', color: c.primary, marginBottom: 8, letterSpacing: 4 },
  subtitle: { fontSize: 20, color: c.muted, marginBottom: 4 },
  badge: { backgroundColor: c.purple, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginTop: 20 },
  badgeText: { fontSize: 12, color: c.text, fontWeight: 'bold' },
  coverDesc: { fontSize: 12, color: c.muted, textAlign: 'center', maxWidth: 400, marginTop: 40, lineHeight: 1.6 },
  
  // Headers
  header: { fontSize: 28, fontWeight: 'bold', color: c.primary, marginBottom: 8 },
  subheader: { fontSize: 13, color: c.muted, marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: c.text, marginBottom: 12, marginTop: 25 },
  
  // Content
  para: { fontSize: 11, color: c.muted, lineHeight: 1.6, marginBottom: 12 },
  
  // Highlight box
  highlight: { backgroundColor: c.card, padding: 16, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: c.primary, marginBottom: 20 },
  highlightYellow: { backgroundColor: c.card, padding: 16, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: c.yellow, marginBottom: 20 },
  
  // Cards
  card: { backgroundColor: c.card, padding: 16, borderRadius: 8, marginBottom: 12 },
  cardAccent: { backgroundColor: c.cardLight, padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: c.primary },
  cardTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 6 },
  cardText: { fontSize: 10, color: c.muted, lineHeight: 1.5 },
  
  // Table
  tableHeader: { flexDirection: 'row', backgroundColor: c.cardLight, padding: 12, borderRadius: 4, marginBottom: 4 },
  tableRow: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ffffff08' },
  tableRowAlt: { flexDirection: 'row', padding: 10, backgroundColor: '#ffffff05', borderBottomWidth: 1, borderBottomColor: '#ffffff08' },
  cell: { flex: 1, fontSize: 10, color: c.muted },
  cellHeader: { flex: 1, fontSize: 10, fontWeight: 'bold', color: c.primary },
  
  // Layout
  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  
  // Code
  codeBox: { backgroundColor: '#0d0d1a', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: c.primary },
  codeLine: { fontSize: 9, color: c.muted, marginBottom: 3 },
  codeComment: { fontSize: 9, color: c.purple, marginBottom: 3 },
  
  // Footer
  pageNum: { position: 'absolute', bottom: 30, right: 50, fontSize: 10, color: c.muted },
  footer: { position: 'absolute', bottom: 30, left: 50, right: 50, textAlign: 'center', fontSize: 10, color: c.muted },
  
  // Team
  teamRow: { flexDirection: 'row', gap: 12, marginTop: 30 },
  teamCard: { flex: 1, backgroundColor: c.card, padding: 20, borderRadius: 8, alignItems: 'center', borderWidth: 2 },
  teamName: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  
  // Divider
  divider: { height: 2, backgroundColor: c.primary, marginVertical: 20, opacity: 0.3 },
  
  // Image
  comparisonImage: { width: '100%', marginBottom: 20, borderRadius: 8 },
});

// Data
const mapping = [
  { bio: '16 Photoreceptors', cnn: 'Input Channels', fn: 'Capture different visual aspects' },
  { bio: 'Compound Eye Facets', cnn: 'Kernels/Filters', fn: 'Local pattern detection' },
  { bio: 'Midband Region', cnn: 'Conv Layers', fn: 'Feature extraction' },
  { bio: 'Optical Ganglia', cnn: 'Pooling', fn: 'Dimensionality reduction' },
  { bio: 'Brain', cnn: 'Dense Layers', fn: 'Feature integration' },
  { bio: 'Strike', cnn: 'Softmax', fn: 'Classification output' },
];

const timeline = [
  { yr: '1998', name: 'LeNet-5', info: 'First practical CNN (LeCun)', color: c.primary },
  { yr: '2012', name: 'AlexNet', info: 'ImageNet winner, deep learning boom', color: c.coral },
  { yr: '2014', name: 'VGG/GoogLeNet', info: 'Depth matters, inception modules', color: c.purple },
  { yr: '2015', name: 'ResNet', info: 'Skip connections, 152+ layers', color: c.pink },
  { yr: '2019', name: 'EfficientNet', info: 'Optimal compound scaling', color: c.yellow },
];

const apps = [
  { title: 'Medical', desc: 'X-rays, MRI, tumor detection', color: c.coral },
  { title: 'Vehicles', desc: 'Lane detection, self-driving', color: c.primary },
  { title: 'Mobile', desc: 'Face ID, AR filters', color: c.purple },
  { title: 'Security', desc: 'Recognition, surveillance', color: c.pink },
  { title: 'Creative', desc: 'Style transfer, generation', color: c.yellow },
  { title: 'Satellite', desc: 'Mapping, disaster response', color: c.blue },
];

export default function ConvoShrimpPDF() {
  return (
    <Document>
      {/* ===== COVER ===== */}
      <Page size="LETTER" style={s.coverPage}>
        <Text style={s.title}>CONVOSHRIMP</Text>
        <Text style={s.subtitle}>Convolutional Neural Network</Text>
        <View style={s.badge}>
          <Text style={s.badgeText}>NEURAL NETWORK ZOO</Text>
        </View>
        <Text style={s.coverDesc}>
          An exploration of how Convolutional Neural Networks mirror the 
          incredible visual processing system of the Mantis Shrimp, 
          nature's most advanced eyes.
        </Text>
        <Text style={[s.subtitle, { marginTop: 80, fontSize: 14 }]}>
          Deep Learning Course | 2026
        </Text>
        <Text style={s.footer}>DeMarcus • Chloe • Matthew • Franck</Text>
      </Page>

      {/* ===== PAGE 2: CREATURE EXHIBIT ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>Meet the ConvoShrimp</Text>
        <Text style={s.subheader}>Neural Network Zoo Exhibit: Convolutional Neural Network</Text>
        
        {/* Creature Card */}
        <View style={{ 
          backgroundColor: c.cardLight, 
          padding: 25, 
          borderRadius: 12, 
          borderWidth: 3, 
          borderColor: c.primary,
          marginBottom: 20
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: c.primary }}>CONVOSHRIMP</Text>
            <View style={{ backgroundColor: c.purple, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 }}>
              <Text style={{ fontSize: 10, color: c.text, fontWeight: 'bold' }}>CNN</Text>
            </View>
          </View>
          
          {/* Creature Image */}
          <Image 
            src="/convoshrimp-creature.png" 
            style={{ width: '100%', height: 180, marginBottom: 15, borderRadius: 8, objectFit: 'contain' }} 
          />
          
          {/* Stats */}
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 15 }}>
            <View style={{ flex: 1, backgroundColor: c.card, padding: 10, borderRadius: 6, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: c.primary }}>16</Text>
              <Text style={{ fontSize: 8, color: c.muted }}>Spectral Channels</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: c.card, padding: 10, borderRadius: 6, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: c.coral }}>23 m/s</Text>
              <Text style={{ fontSize: 8, color: c.muted }}>Strike Speed</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: c.card, padding: 10, borderRadius: 6, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: c.purple }}>98%</Text>
              <Text style={{ fontSize: 8, color: c.muted }}>Vision Accuracy</Text>
            </View>
          </View>
          
          {/* Description */}
          <Text style={{ fontSize: 10, color: c.muted, lineHeight: 1.5 }}>
            The CNN Mantis Shrimp is a legendary creature known for its unparalleled visual processing 
            capabilities. With 16 types of photoreceptors and parallel processing eyes, it can detect 
            patterns invisible to other species. Its lightning-fast strike represents the decisive 
            classification output of the network.
          </Text>
        </View>

        {/* Abilities */}
        <Text style={s.sectionTitle}>Special Abilities</Text>
        <View style={s.row}>
          <View style={s.col}>
            <View style={[s.card, { borderLeftWidth: 4, borderLeftColor: c.primary }]}>
              <Text style={[s.cardTitle, { color: c.primary }]}>PARALLEL VISION</Text>
              <Text style={s.cardText}>Process multiple feature maps simultaneously</Text>
            </View>
          </View>
          <View style={s.col}>
            <View style={[s.card, { borderLeftWidth: 4, borderLeftColor: c.coral }]}>
              <Text style={[s.cardTitle, { color: c.coral }]}>LIGHTNING STRIKE</Text>
              <Text style={s.cardText}>Rapid classification in milliseconds</Text>
            </View>
          </View>
          <View style={s.col}>
            <View style={[s.card, { borderLeftWidth: 4, borderLeftColor: c.purple }]}>
              <Text style={[s.cardTitle, { color: c.purple }]}>PATTERN HUNTER</Text>
              <Text style={s.cardText}>Detect edges, textures, and complex shapes</Text>
            </View>
          </View>
        </View>

        <Text style={s.pageNum}>2</Text>
      </Page>

      {/* ===== PAGE 3: INTRO TO NEURAL NETWORKS ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>Introduction to Neural Networks</Text>
        <Text style={s.subheader}>The building blocks of deep learning</Text>
        
        <View style={s.highlight}>
          <Text style={s.para}>
            Neural networks are computational systems inspired by biological brains. 
            They consist of interconnected nodes (neurons) organized in layers that 
            process and transform data to recognize patterns and make predictions.
          </Text>
        </View>

        <Text style={s.sectionTitle}>Neuron Structure</Text>
        <View style={s.card}>
          <Text style={s.cardText}>
            Each artificial neuron receives inputs, applies weights, sums them, 
            adds a bias, and passes the result through an activation function. 
            This mimics how biological neurons fire based on incoming signals.
          </Text>
        </View>

        <Text style={s.sectionTitle}>Layer Organization</Text>
        <View style={s.row}>
          <View style={s.col}>
            <View style={[s.cardAccent, { borderColor: c.primary }]}>
              <Text style={[s.cardTitle, { color: c.primary }]}>INPUT LAYER</Text>
              <Text style={s.cardText}>
                Receives raw data (images, text, numbers). For images, each pixel 
                becomes an input.
              </Text>
            </View>
          </View>
          <View style={s.col}>
            <View style={[s.cardAccent, { borderColor: c.purple }]}>
              <Text style={[s.cardTitle, { color: c.purple }]}>HIDDEN LAYERS</Text>
              <Text style={s.cardText}>
                Process and transform data. More layers = deeper network = more 
                complex patterns.
              </Text>
            </View>
          </View>
          <View style={s.col}>
            <View style={[s.cardAccent, { borderColor: c.coral }]}>
              <Text style={[s.cardTitle, { color: c.coral }]}>OUTPUT LAYER</Text>
              <Text style={s.cardText}>
                Produces final predictions (classifications, probabilities, values).
              </Text>
            </View>
          </View>
        </View>

        <Text style={s.sectionTitle}>Deep Learning</Text>
        <View style={s.highlightYellow}>
          <Text style={[s.para, { marginBottom: 0 }]}>
            Deep learning uses neural networks with many hidden layers to learn 
            hierarchical representations. CNNs are a specialized type designed 
            specifically for processing spatial data like images.
          </Text>
        </View>

        <Text style={s.pageNum}>3</Text>
      </Page>

      {/* ===== PAGE 4: WHY ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>Why Mantis Shrimp = CNN</Text>
        <Text style={s.subheader}>The biological and computational parallels</Text>
        
        <View style={s.highlight}>
          <Text style={s.para}>
            The mantis shrimp possesses 16 types of photoreceptors (humans have 3), 
            enabling it to see UV, polarized light, and colors we cannot perceive. 
            CNNs similarly use multiple filter channels to extract features invisible 
            to simpler systems.
          </Text>
        </View>

        {/* Comparison Image */}
        <Image 
          src="/cnn-shrimp-comparison.png" 
          style={{ width: '100%', marginBottom: 15, borderRadius: 8 }} 
        />

        <View style={[s.highlightYellow, { marginTop: 10 }]}>
          <Text style={[s.para, { marginBottom: 0, fontSize: 9 }]}>
            Note: This comparison is illustrative. Both systems share conceptual parallels, 
            but biological neural networks operate through fundamentally different mechanisms 
            than artificial ones.
          </Text>
        </View>

        <Text style={s.pageNum}>4</Text>
      </Page>

      {/* ===== PAGE 5: MAPPING TABLE ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>Biological to Computational Mapping</Text>
        <Text style={s.subheader}>How each mantis shrimp component maps to CNN architecture</Text>
        
        <View style={s.tableHeader}>
          <Text style={s.cellHeader}>Mantis Shrimp</Text>
          <Text style={s.cellHeader}>CNN Component</Text>
          <Text style={s.cellHeader}>Shared Function</Text>
        </View>
        {mapping.map((r, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableRow : s.tableRowAlt}>
            <Text style={[s.cell, { color: c.coral }]}>{r.bio}</Text>
            <Text style={[s.cell, { color: c.primary }]}>{r.cnn}</Text>
            <Text style={s.cell}>{r.fn}</Text>
          </View>
        ))}

        <View style={[s.highlight, { marginTop: 25 }]}>
          <Text style={[s.para, { marginBottom: 0 }]}>
            Both systems evolved for the same purpose: extracting meaningful patterns 
            from visual data through hierarchical, parallel processing. Nature solved 
            computer vision millions of years before we did.
          </Text>
        </View>

        <Text style={s.pageNum}>5</Text>
      </Page>

      {/* ===== PAGE 6: HOW IT WORKS ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>How CNNs Work</Text>
        <Text style={s.subheader}>The core operations that power visual AI</Text>

        <View style={s.row}>
          <View style={s.col}>
            <View style={[s.cardAccent, { borderColor: c.primary }]}>
              <Text style={[s.cardTitle, { color: c.primary }]}>CONVOLUTION</Text>
              <Text style={s.cardText}>
                A small filter (kernel) slides across the image, detecting patterns 
                like edges, textures, and shapes at each position.
              </Text>
            </View>
            <View style={[s.cardAccent, { borderColor: c.purple }]}>
              <Text style={[s.cardTitle, { color: c.purple }]}>POOLING</Text>
              <Text style={s.cardText}>
                Reduces spatial dimensions by taking max or average values, 
                making the network efficient and translation-invariant.
              </Text>
            </View>
          </View>
          <View style={s.col}>
            <View style={[s.cardAccent, { borderColor: c.coral }]}>
              <Text style={[s.cardTitle, { color: c.coral }]}>ReLU ACTIVATION</Text>
              <Text style={s.cardText}>
                f(x) = max(0, x). Introduces non-linearity, allowing the network 
                to learn complex patterns beyond linear combinations.
              </Text>
            </View>
            <View style={[s.cardAccent, { borderColor: c.pink }]}>
              <Text style={[s.cardTitle, { color: c.pink }]}>SOFTMAX OUTPUT</Text>
              <Text style={s.cardText}>
                Converts raw scores to probabilities (0-1, sum to 1). 
                The class with highest probability is the prediction.
              </Text>
            </View>
          </View>
        </View>

        <View style={s.divider} />
        <Text style={s.sectionTitle}>Architecture Evolution</Text>

        {timeline.map((t, i) => (
          <View key={i} style={s.tableRow}>
            <Text style={[s.cell, { flex: 0.4, color: t.color, fontWeight: 'bold' }]}>{t.yr}</Text>
            <Text style={[s.cell, { flex: 0.8, color: t.color }]}>{t.name}</Text>
            <Text style={[s.cell, { flex: 2 }]}>{t.info}</Text>
          </View>
        ))}

        <Text style={s.pageNum}>6</Text>
      </Page>

      {/* ===== PAGE 7: CODE ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>Code Implementation</Text>
        <Text style={s.subheader}>PyTorch CNN with biological naming</Text>

        <View style={s.codeBox}>
          <Text style={s.codeComment}># ConvoShrimp CNN Architecture</Text>
          <Text style={s.codeLine}>class ConvoShrimp(nn.Module):</Text>
          <Text style={s.codeLine}>    def __init__(self, num_classes=10):</Text>
          <Text style={s.codeLine}>        super().__init__()</Text>
          <Text style={s.codeLine}> </Text>
          <Text style={s.codeComment}>        # EYES: Input Processing (RGB → 32 channels)</Text>
          <Text style={s.codeLine}>        self.eyes = nn.Sequential(</Text>
          <Text style={s.codeLine}>            nn.Conv2d(3, 32, kernel_size=3, padding=1),</Text>
          <Text style={s.codeLine}>            nn.BatchNorm2d(32), nn.ReLU(),</Text>
          <Text style={s.codeLine}>            nn.MaxPool2d(2, 2))</Text>
          <Text style={s.codeLine}> </Text>
          <Text style={s.codeComment}>        # MIDBAND: Feature Extraction</Text>
          <Text style={s.codeLine}>        self.midband = nn.Sequential(</Text>
          <Text style={s.codeLine}>            nn.Conv2d(32, 64, 3, padding=1),</Text>
          <Text style={s.codeLine}>            nn.Conv2d(64, 128, 3, padding=1),</Text>
          <Text style={s.codeLine}>            nn.MaxPool2d(2, 2))</Text>
          <Text style={s.codeLine}> </Text>
          <Text style={s.codeComment}>        # GANGLIA: Global Aggregation</Text>
          <Text style={s.codeLine}>        self.ganglia = nn.AdaptiveAvgPool2d((4, 4))</Text>
          <Text style={s.codeLine}> </Text>
          <Text style={s.codeComment}>        # BRAIN + STRIKE: Classification</Text>
          <Text style={s.codeLine}>        self.brain = nn.Sequential(</Text>
          <Text style={s.codeLine}>            nn.Flatten(),</Text>
          <Text style={s.codeLine}>            nn.Linear(128*4*4, 512),</Text>
          <Text style={s.codeLine}>            nn.Dropout(0.5))</Text>
          <Text style={s.codeLine}>        self.strike = nn.Linear(512, num_classes)</Text>
        </View>

        <View style={[s.highlight, { marginTop: 20 }]}>
          <Text style={s.para}>
            Complete runnable code with CIFAR-10 training (70-80% accuracy) 
            is available in the interactive web version of this lookbook.
          </Text>
        </View>

        <Text style={s.pageNum}>7</Text>
      </Page>

      {/* ===== PAGE 8: APPLICATIONS ===== */}
      <Page size="LETTER" style={s.page}>
        <Text style={s.header}>Real-World Applications</Text>
        <Text style={s.subheader}>Where CNNs dominate today</Text>

        <View style={s.row}>
          <View style={s.col}>
            {apps.slice(0, 3).map((a, i) => (
              <View key={i} style={[s.card, { borderLeftWidth: 4, borderLeftColor: a.color }]}>
                <Text style={[s.cardTitle, { color: a.color }]}>{a.title}</Text>
                <Text style={s.cardText}>{a.desc}</Text>
              </View>
            ))}
          </View>
          <View style={s.col}>
            {apps.slice(3).map((a, i) => (
              <View key={i} style={[s.card, { borderLeftWidth: 4, borderLeftColor: a.color }]}>
                <Text style={[s.cardTitle, { color: a.color }]}>{a.title}</Text>
                <Text style={s.cardText}>{a.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.divider} />
        <Text style={s.sectionTitle}>References</Text>
        
        <View style={s.card}>
          <Text style={[s.cardText, { marginBottom: 4 }]}>[1] Marshall, N.J. (1999). Mantis shrimp color vision. Nature.</Text>
          <Text style={[s.cardText, { marginBottom: 4 }]}>[2] LeCun, Y. (1998). Gradient-based learning. Proc. IEEE.</Text>
          <Text style={[s.cardText, { marginBottom: 4 }]}>[3] Krizhevsky, A. (2012). ImageNet classification. NeurIPS.</Text>
          <Text style={[s.cardText, { marginBottom: 4 }]}>[4] He, K. (2016). Deep residual learning. CVPR.</Text>
          <Text style={[s.cardText, { marginBottom: 4 }]}>[5] Simonyan, K. (2014). Very deep CNNs. arXiv.</Text>
          <Text style={[s.cardText, { marginBottom: 4 }]}>[6] Tan, M. (2019). EfficientNet. ICML.</Text>
        </View>

        <Text style={s.pageNum}>8</Text>
      </Page>

      {/* ===== BACK COVER ===== */}
      <Page size="LETTER" style={s.coverPage}>
        <Text style={[s.title, { fontSize: 40 }]}>CONVOSHRIMP</Text>
        <Text style={s.subtitle}>Neural Network Zoo Collection</Text>

        <Text style={[s.sectionTitle, { marginTop: 50, textAlign: 'center' }]}>Team</Text>
        <View style={[s.teamRow, { width: 400 }]}>
          <View style={[s.teamCard, { borderColor: c.primary, paddingVertical: 25 }]}>
            <Text style={[s.teamName, { color: c.primary }]}>DeMarcus</Text>
          </View>
          <View style={[s.teamCard, { borderColor: c.pink, paddingVertical: 25 }]}>
            <Text style={[s.teamName, { color: c.pink }]}>Chloe</Text>
          </View>
        </View>
        <View style={[s.teamRow, { width: 400, marginTop: 12 }]}>
          <View style={[s.teamCard, { borderColor: c.purple, paddingVertical: 25 }]}>
            <Text style={[s.teamName, { color: c.purple }]}>Matthew</Text>
          </View>
          <View style={[s.teamCard, { borderColor: c.yellow, paddingVertical: 25 }]}>
            <Text style={[s.teamName, { color: c.yellow }]}>Franck</Text>
          </View>
        </View>

        <View style={[s.badge, { marginTop: 60 }]}>
          <Text style={s.badgeText}>DEEP LEARNING | 2026</Text>
        </View>
      </Page>
    </Document>
  );
}
