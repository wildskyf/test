// code is modified from https://wellwind.idv.tw/blog/2018/04/07/tensorflow-js-basic/

// 在TensorFlow中宣告一個變數，並給予一個隨機數值。
var input = Math.random();
const trainingAnswer = tf.variable(tf.scalar(input));

// 以這個參數來產生一個模型公式: a * x
function predict(x) {
  // 避免變數在TensorFlow運算中站用過多記憶體的一種管理機制
  return tf.tidy(() => {
    return trainingAnswer.mul(x)
  });
}

// 損失函式，用來評估預測值與正確答案的差距
function loss(predictions, labels) {
  const meanSquareError = predictions.sub(labels).square().mean();
  return meanSquareError;
}

// 訓練函式，根據訓練結果來隨機調升或調降參數的值
function train(/* 問題資料集 = */ xs, /* 答案資料集 = */ ys, /* 次數 */ numIterations) {
  // 學習率，代表學習的跳耀程度，越低代表速度越慢，越高代表越快，但也可能跳太快
  const learningRate = 0.1;
  const optimizer = tf.train.sgd(learningRate);

  for (let i = 0; i < numIterations; i++) {
    // 讓誤差 minimize
    optimizer.minimize( () => {
      const predsYs = predict(xs);
      return loss(predsYs, ys); // 回傳誤差
    });
  }
}

// ============ 函式準備完成

function generateData(numPoints, answer) {
  return tf.tidy( () => {
    // 產生常態分佈的隨機資料
    const xs = tf.randomNormal([numPoints], -1, 1);
    // 套用正確模型產生答案
    const ans = tf.scalar(answer);
    const ys = ans.mul(xs);
    // 回傳訓練資料與答案
    return {
      xs,
      ys
    };
  })
}

async function learnCoefficients(dataCount, iterations) {
  const correctAnswer = 2; // 正確答案
  const trainingData = generateData(dataCount, 2);

  console.log('Before Training: ', await trainingAnswer.data());

  // Train the model!
  await train(trainingData.xs, trainingData.ys, iterations);

  // 印出訓練結果
  console.log('After Training: ', await trainingAnswer.data());
}

learnCoefficients(100, 1000);

