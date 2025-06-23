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

    // Determine category and overweight status
    let bmiCategory = "";
    let overweight = false;

    if (bmiValue < 18.5) {
      bmiCategory = "Kekurangan Berat Badan";
      overweight = false;
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      bmiCategory = "Normal";
      overweight = false;
    } else if (bmiValue >= 25 && bmiValue < 30) {
      bmiCategory = "Kelebihan Berat Badan";
      overweight = true;
    } else {
      bmiCategory = "Obesitas";
      overweight = true;
    }

    setCategory(bmiCategory);
    setIsOverweight(overweight);
  };

  const getBMIColor = () => {
    if (!bmi) return "#6B7280";
    if (bmi < 18.5) return "#2563EB";
    if (bmi < 25) return "#16A34A";
    if (bmi < 30) return "#CA8A04";
    return "#DC2626";
  };

  const getBMIDescription = () => {
    if (!bmi) return "";

    const genderText = gender === "male" ? "laki-laki" : "perempuan";

    if (bmi < 18.5) {
      return `Sebagai ${genderText}, Anda memiliki berat badan kurang dari normal. Disarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk program penambahan berat badan yang sehat.`;
    } else if (bmi < 25) {
      return `Sebagai ${genderText}, Anda memiliki berat badan yang ideal dan sehat. Pertahankan pola makan seimbang dan aktivitas fisik teratur.`;
    } else if (bmi < 30) {
      return `Sebagai ${genderText}, Anda mengalami kelebihan berat badan (overweight). Disarankan untuk mengurangi berat badan melalui diet seimbang dan olahraga teratur.`;
    } else {
      return `Sebagai ${genderText}, Anda mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan dokter untuk program penurunan berat badan yang aman dan efektif.`;
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
            Hitung Indeks Massa Tubuh Anda dengan mudah
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
                🏥 Interpretasi Medis:
              </Text>
              <Text style={styles.descriptionText}>{getBMIDescription()}</Text>
            </View>

            <View style={styles.rangeContainer}>
              <BMIRangeCard title="Kurus" range="< 18.5" color="#2563EB" />
              <BMIRangeCard
                title="Normal"
                range="18.5 - 24.9"
                color="#16A34A"
              />
              <BMIRangeCard
                title="Berlebih"
                range="25.0 - 29.9"
                color="#CA8A04"
              />
              <BMIRangeCard title="Obesitas" range="≥ 30.0" color="#DC2626" />
            </View>

            <Text style={styles.disclaimer}>
              * Hasil ini hanya sebagai referensi. Konsultasikan dengan dokter
              untuk evaluasi kesehatan yang lebih komprehensif.
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
    minWidth: "45%",
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
