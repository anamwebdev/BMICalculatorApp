import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [isOverweight, setIsOverweight] = useState(false);

  const getGenderBMICategory = (
    bmiValue: number,
    genderType: string
  ): { category: string; isOverweight: boolean } => {
    if (genderType === "male") {
      // Klasifikasi untuk Laki-laki
      if (bmiValue < 20) return { category: "Kurus", isOverweight: false };
      if (bmiValue >= 20 && bmiValue <= 25.9)
        return { category: "Normal", isOverweight: false };
      if (bmiValue >= 26 && bmiValue <= 29.9)
        return { category: "Overweight", isOverweight: true };
      if (bmiValue >= 30 && bmiValue <= 34.9)
        return { category: "Obesitas Kelas 1", isOverweight: true };
      if (bmiValue >= 35 && bmiValue <= 39.9)
        return { category: "Obesitas Kelas 2", isOverweight: true };
      return { category: "Obesitas Kelas 3", isOverweight: true };
    } else {
      // Klasifikasi untuk Perempuan
      if (bmiValue < 18.5) return { category: "Kurus", isOverweight: false };
      if (bmiValue >= 18.5 && bmiValue <= 24.4)
        return { category: "Normal", isOverweight: false };
      if (bmiValue >= 24.5 && bmiValue <= 29.9)
        return { category: "Overweight", isOverweight: true };
      if (bmiValue >= 30 && bmiValue <= 34.9)
        return { category: "Obesitas Kelas 1", isOverweight: true };
      if (bmiValue >= 35 && bmiValue <= 39.9)
        return { category: "Obesitas Kelas 2", isOverweight: true };
      return { category: "Obesitas Kelas 3", isOverweight: true };
    }
  };

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convert cm to meters

    if (!weight || !height) {
      Alert.alert("Error", "Mohon isi semua data yang diperlukan");
      return;
    }

    if (weightNum <= 0 || heightNum <= 0) {
      Alert.alert("Error", "Mohon masukkan nilai yang valid");
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue);

    const { category: bmiCategory, isOverweight: overweight } =
      getGenderBMICategory(bmiValue, gender);

    setCategory(bmiCategory);
    setIsOverweight(overweight);
  };

  const getBMIColor = () => {
    if (!bmi) return "#6B7280";

    if (gender === "male") {
      if (bmi < 20) return "#2563EB";
      if (bmi <= 25) return "#16A34A";
      if (bmi <= 29) return "#CA8A04";
      if (bmi <= 34) return "#EA580C";
      if (bmi <= 39) return "#DC2626";
      return "#7F1D1D";
    } else {
      if (bmi < 18.5) return "#2563EB";
      if (bmi <= 24.4) return "#16A34A";
      if (bmi <= 29.9) return "#CA8A04";
      if (bmi <= 34.9) return "#EA580C";
      if (bmi <= 39.9) return "#DC2626";
      return "#7F1D1D";
    }
  };

  const getGenderSpecificDescription = () => {
    if (!bmi) return "";

    const genderText = gender === "male" ? "laki-laki" : "perempuan";

    if (gender === "male") {
      // Interpretasi untuk Laki-laki
      if (bmi < 20) {
        return `Sebagai ${genderText}, Anda memiliki berat badan kurus. Laki-laki dengan BMI di bawah 20 berisiko mengalami kekurangan nutrisi dan massa otot yang rendah. Disarankan untuk berkonsultasi dengan ahli gizi untuk program penambahan berat badan yang sehat melalui peningkatan asupan protein dan latihan kekuatan.`;
      } else if (bmi <= 25) {
        return `Sebagai ${genderText}, Anda memiliki berat badan normal dan ideal. Pertahankan pola makan seimbang dengan protein yang cukup dan aktivitas fisik teratur termasuk latihan kekuatan untuk menjaga massa otot yang optimal.`;
      } else if (bmi <= 29) {
        return `Sebagai ${genderText}, Anda mengalami overweight. Laki-laki dengan BMI 26-29 berisiko mengalami penumpukan lemak perut yang dapat meningkatkan risiko penyakit kardiovaskular. Disarankan untuk mengurangi berat badan 5-10% melalui diet seimbang dan olahraga kardio serta latihan kekuatan.`;
      } else if (bmi <= 34) {
        return `Sebagai ${genderText}, Anda mengalami Obesitas Kelas 1. Risiko komplikasi kesehatan meningkat seperti diabetes tipe 2, hipertensi, dan penyakit jantung koroner. Sangat disarankan konsultasi dengan dokter untuk program penurunan berat badan terstruktur dan pemeriksaan kesehatan rutin.`;
      } else if (bmi <= 39) {
        return `Sebagai ${genderText}, Anda mengalami Obesitas Kelas 2. Risiko tinggi untuk komplikasi serius termasuk sleep apnea, fatty liver, dan gangguan metabolik. Wajib konsultasi dengan dokter spesialis untuk evaluasi komprehensif dan program penurunan berat badan intensif.`;
      } else {
        return `Sebagai ${genderText}, Anda mengalami Obesitas Kelas 3. Risiko sangat tinggi untuk komplikasi yang mengancam jiwa. Segera konsultasi dengan tim medis multidisiplin untuk evaluasi menyeluruh dan kemungkinan intervensi bedah bariatrik.`;
      }
    } else {
      // Interpretasi untuk Perempuan
      if (bmi < 18.5) {
        return `Sebagai ${genderText}, Anda memiliki berat badan kurus. Perempuan dengan BMI di bawah 18.5 berisiko mengalami gangguan menstruasi, osteoporosis dini, dan komplikasi kehamilan. Disarankan untuk berkonsultasi dengan dokter dan ahli gizi untuk program penambahan berat badan yang aman.`;
      } else if (bmi <= 24.4) {
        return `Sebagai ${genderText}, Anda memiliki berat badan normal dan sehat. Pertahankan pola makan bergizi seimbang dengan asupan kalsium dan zat besi yang cukup, serta aktivitas fisik teratur untuk menjaga kesehatan tulang dan hormonal.`;
      } else if (bmi <= 29.9) {
        return `Sebagai ${genderText}, Anda mengalami overweight. Perempuan dengan BMI 24.5-29.9 berisiko mengalami gangguan hormonal, PCOS, dan komplikasi kehamilan. Disarankan untuk mengurangi berat badan secara bertahap melalui diet seimbang dan olahraga yang sesuai.`;
      } else if (bmi <= 34.9) {
        return `Sebagai ${genderText}, Anda mengalami Obesitas Kelas 1. Risiko komplikasi kesehatan meningkat termasuk diabetes gestasional, hipertensi, dan gangguan kesuburan. Sangat disarankan konsultasi dengan dokter untuk program penurunan berat badan yang aman dan sesuai.`;
      } else if (bmi <= 39.9) {
        return `Sebagai ${genderText}, Anda mengalami Obesitas Kelas 2. Risiko tinggi untuk komplikasi serius termasuk gangguan reproduksi, sleep apnea, dan penyakit kardiovaskular. Wajib konsultasi dengan dokter spesialis untuk evaluasi dan penanganan komprehensif.`;
      } else {
        return `Sebagai ${genderText}, Anda mengalami Obesitas Kelas 3. Risiko sangat tinggi untuk komplikasi yang mengancam jiwa dan gangguan reproduksi berat. Segera konsultasi dengan tim medis multidisiplin untuk evaluasi menyeluruh dan kemungkinan intervensi bedah bariatrik.`;
      }
    }
  };

  const getGenderSpecificRanges = () => {
    if (gender === "male") {
      return [
        { title: "Kurus", range: "< 20.0", color: "#2563EB" },
        { title: "Normal", range: "20.0 - 25.0", color: "#16A34A" },
        { title: "Overweight", range: "26.0 - 29.0", color: "#CA8A04" },
        { title: "Obesitas 1", range: "30.0 - 34.0", color: "#EA580C" },
        { title: "Obesitas 2", range: "35.0 - 39.0", color: "#DC2626" },
        { title: "Obesitas 3", range: "≥ 40.0", color: "#7F1D1D" },
      ];
    } else {
      return [
        { title: "Kurus", range: "< 18.5", color: "#2563EB" },
        { title: "Normal", range: "18.5 - 24.4", color: "#16A34A" },
        { title: "Overweight", range: "24.5 - 29.9", color: "#CA8A04" },
        { title: "Obesitas 1", range: "30.0 - 34.9", color: "#EA580C" },
        { title: "Obesitas 2", range: "35.0 - 39.9", color: "#DC2626" },
        { title: "Obesitas 3", range: "≥ 40.0", color: "#7F1D1D" },
      ];
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setGender("male");
    setBmi(null);
    setCategory("");
    setIsOverweight(false);
  };

  interface GenderButtonProps {
    value: string;
    label: string;
    selected: boolean;
    onPress: () => void;
  }

  const GenderButton: React.FC<GenderButtonProps> = ({
    value,
    label,
    selected,
    onPress,
  }) => (
    <TouchableOpacity
      style={[styles.genderButton, selected && styles.genderButtonSelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.genderButtonText,
          selected && styles.genderButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  interface BMIRangeCardProps {
    title: string;
    range: string;
    color: string;
  }

  const BMIRangeCard: React.FC<BMIRangeCardProps> = ({
    title,
    range,
    color,
  }) => (
    <View style={[styles.rangeCard, { backgroundColor: color + "20" }]}>
      <Text style={[styles.rangeTitle, { color: color }]}>{title}</Text>
      <Text style={[styles.rangeValue, { color: color }]}>{range}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EFF6FF" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧮 Kalkulator BMI</Text>
          <Text style={styles.subtitle}>
            Hitung Indeks Massa Tubuh Berdasarkan Gender
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Input Data Pribadi</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>⚖️ Berat Badan (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan berat badan"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>📏 Tinggi Badan (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan tinggi badan"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>👤 Jenis Kelamin</Text>
            <View style={styles.genderContainer}>
              <GenderButton
                value="male"
                label="Laki-laki"
                selected={gender === "male"}
                onPress={() => setGender("male")}
              />
              <GenderButton
                value="female"
                label="Perempuan"
                selected={gender === "female"}
                onPress={() => setGender("female")}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.calculateButton,
                (!weight || !height) && styles.calculateButtonDisabled,
              ]}
              onPress={calculateBMI}
              disabled={!weight || !height}
            >
              <Text style={styles.calculateButtonText}>🧮 Hitung BMI</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={reset}>
              <Text style={styles.resetButtonText}>🔄 Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results */}
        {bmi && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Hasil Perhitungan BMI</Text>

            <View style={styles.bmiResultContainer}>
              <Text style={styles.bmiValue}>{bmi.toFixed(1)}</Text>
              <Text style={[styles.bmiCategory, { color: getBMIColor() }]}>
                {category}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: isOverweight ? "#FEE2E2" : "#DCFCE7" },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: isOverweight ? "#DC2626" : "#16A34A" },
                  ]}
                >
                  {isOverweight
                    ? "Kelebihan Berat Badan"
                    : "Berat Badan Normal/Kurang"}
                </Text>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>
                🏥 Interpretasi Medis Berdasarkan Gender:
              </Text>
              <Text style={styles.descriptionText}>
                {getGenderSpecificDescription()}
              </Text>
            </View>

            <View style={styles.rangeContainer}>
              {getGenderSpecificRanges().map((range, index) => (
                <BMIRangeCard
                  key={index}
                  title={range.title}
                  range={range.range}
                  color={range.color}
                />
              ))}
            </View>

            <Text style={styles.disclaimer}>
              * Hasil ini berdasarkan klasifikasi BMI khusus gender.
              Konsultasikan dengan dokter untuk evaluasi kesehatan yang lebih
              komprehensif.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  genderButtonSelected: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#374151",
  },
  genderButtonTextSelected: {
    color: "white",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  calculateButton: {
    flex: 1,
    backgroundColor: "#3B82F6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  calculateButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  calculateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    backgroundColor: "white",
  },
  resetButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "500",
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: "#BFDBFE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  bmiResultContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  bmiValue: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#1F2937",
  },
  bmiCategory: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  descriptionContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  rangeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  rangeCard: {
    flex: 1,
    minWidth: "30%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  rangeTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  rangeValue: {
    fontSize: 12,
    fontWeight: "500",
  },
  disclaimer: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});
